// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct VotingSession {
        string description;
        string[] candidateNames;
        uint256 durationInMinutes;
        uint256 startTime;
        bool isActive;
    }

    Candidate[] public candidates;
    VotingSession[] public votingSessions;
    mapping(address => bool) public voters;

    address public owner;

    event NewVotingSession(address indexed admin, string description, string[] candidateNames, uint256 durationInMinutes);
    event VoteCasted(address indexed voter, uint256 candidateIndex);
    event VotingSessionCancelled(uint256 indexed sessionId);
    event VotingSessionEnded(uint256 indexed sessionId, string winner, uint256 totalVotes);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyActiveVotingSession {
        require(votingSessions.length > 0 && votingSessions[votingSessions.length - 1].isActive, "No active voting session.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createVotingSession(string memory _description, string[] memory _candidateNames, uint256 _durationInMinutes) public onlyOwner {
        require(_candidateNames.length > 0, "At least one candidate required.");
        require(_durationInMinutes > 0, "Duration must be greater than zero.");

        votingSessions.push(VotingSession({
            description: _description,
            candidateNames: _candidateNames,
            durationInMinutes: _durationInMinutes,
            startTime: block.timestamp,
            isActive: true
        }));

        emit NewVotingSession(msg.sender, _description, _candidateNames, _durationInMinutes);

        // Add candidates to the candidates array
        
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }

    }

    function cancelVotingSession() public onlyOwner onlyActiveVotingSession {
        uint256 sessionId = votingSessions.length - 1;
        votingSessions[sessionId].isActive = false;

        emit VotingSessionCancelled(sessionId);
    }

    function vote(uint256 _candidateIndex) public onlyActiveVotingSession {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < votingSessions[votingSessions.length - 1].candidateNames.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;

        emit VoteCasted(msg.sender, _candidateIndex);
    }

    function endVotingSession() public onlyOwner onlyActiveVotingSession {
        uint256 sessionId = votingSessions.length - 1;
        VotingSession storage session = votingSessions[sessionId];

        require(block.timestamp >= session.startTime + (session.durationInMinutes * 1 minutes), "Voting session duration not elapsed yet.");

        uint256 maxVotes = 0;
        uint256 winningCandidateIndex;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningCandidateIndex = i;
            }
        }

        string memory winnerName = candidates[winningCandidateIndex].name;

        emit VotingSessionEnded(sessionId, winnerName, maxVotes);

        session.isActive = false;
    }

    // Optionally, you can add a function to retrieve the list of candidates
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        if (votingSessions.length == 0) {
            return false;
        } else {
            return votingSessions[votingSessions.length - 1].isActive;
        }
    }

    function getRemainingTime() public view returns (uint256) {
        if (votingSessions.length == 0 || !votingSessions[votingSessions.length - 1].isActive) {
            return 0;
        } else {
            VotingSession storage session = votingSessions[votingSessions.length - 1];
            if (block.timestamp >= session.startTime + (session.durationInMinutes * 1 minutes)) {
                return 0;
            } else {
                return (session.startTime + (session.durationInMinutes * 1 minutes)) - block.timestamp;
            }
        }
    }
}