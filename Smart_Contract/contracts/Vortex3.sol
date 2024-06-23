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
    address[] public votersList;

    event NewVotingSession(address indexed admin, string description, string[] candidateNames, uint256 durationInMinutes);
    event VoteCasted(address indexed voter, uint256 candidateIndex);
    event VotingSessionCancelled(uint256 indexed sessionId);
    event VotingSessionEnded(uint256 indexed sessionId, string winner, uint256 totalVotes);
    event CandidateAdded(string name);
    event CandidateDeleted(uint256 index, string name);

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

        // Deactivate the previous voting session, if any
        if (votingSessions.length > 0) {
            votingSessions[votingSessions.length - 1].isActive = false;
        }

        votingSessions.push(VotingSession({
            description: _description,
            candidateNames: _candidateNames,
            durationInMinutes: _durationInMinutes,
            startTime: block.timestamp,
            isActive: true
        }));

        emit NewVotingSession(msg.sender, _description, _candidateNames, _durationInMinutes);

        // Remove previous candidates
        delete candidates;

        // Add candidates to the candidates array
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }
    function addCandidate(string memory _name) public onlyOwner onlyActiveVotingSession {
        require(votingSessions.length > 0 && votingSessions[votingSessions.length - 1].isActive, "No active voting session.");

        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
        emit CandidateAdded(_name);
    }


    function cancelVotingSession() public onlyOwner onlyActiveVotingSession {
        uint256 sessionId = votingSessions.length - 1;
        votingSessions[sessionId].isActive = false;

        // Reset the voters mapping
        for (uint256 i = 0; i < votersList.length; i++) {
            voters[votersList[i]] = false;
        }

        delete candidates;

        emit VotingSessionCancelled(sessionId);
    }
     // Function to delete a single candidate by index
    function deleteCandidate(uint256 _index) public onlyOwner onlyActiveVotingSession {
        require(_index < candidates.length, "Invalid candidate index.");

        string memory deletedCandidateName = candidates[_index].name;

        // Swap with the last candidate and then pop
        if (_index != candidates.length - 1) {
            candidates[_index] = candidates[candidates.length - 1];
        }
        candidates.pop();

        emit CandidateDeleted(_index, deletedCandidateName);
    }

    function vote(uint256 _candidateIndex) public onlyActiveVotingSession {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < votingSessions[votingSessions.length - 1].candidateNames.length, "Invalid candidate index.");

        VotingSession storage session = votingSessions[votingSessions.length - 1];
        require(block.timestamp < session.startTime + (session.durationInMinutes * 1 minutes), "Voting session has expired.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;

        // Add the address to the voters list
        votersList.push(msg.sender);

        emit VoteCasted(msg.sender, _candidateIndex);
    }


     // Function to get total votes casted
    function getTotalVotes() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            total += candidates[i].voteCount;
        }
        return total;
    }

     // Function to get total number of historical voting sessions conducted
    function getTotalVotingSessions() public view returns (uint256) {
        return votingSessions.length;
    }

    // Function to get details of a specific historical voting session by index
    function getVotingSession(uint256 index) public view returns (string memory description, string[] memory candidateNames, uint256 durationInMinutes, uint256 startTime, bool isActive) {
        require(index < votingSessions.length, "Invalid voting session index.");
        VotingSession storage session = votingSessions[index];
        return (
            session.description,
            session.candidateNames,
            session.durationInMinutes,
            session.startTime,
            session.isActive
        );
    }

    // ...

     // Function to get total number of candidates
    function getTotalCandidates() public view returns (uint256) {
        return candidates.length;
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

    
    function getWinners() public view returns (string[] memory) {
        require(votingSessions.length > 0 && !votingSessions[votingSessions.length - 1].isActive, "Voting session is still active or no voting session conducted.");

        uint256 maxVotes = 0;
        uint256 numWinners = 0;
        // Count the number of candidates with the maximum number of votes
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                numWinners = 1;
            } else if (candidates[i].voteCount == maxVotes) {
                numWinners++;
            }
        }

        // Create an array to store the winners' names
        string[] memory winners = new string[](numWinners);
        uint256 winnerIndex = 0;
        // Store the names of candidates with the maximum number of votes
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount == maxVotes) {
                winners[winnerIndex] = candidates[i].name;
                winnerIndex++;
            }
        }

        return winners;
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
