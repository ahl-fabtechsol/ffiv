// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserProfile {
    struct User {
        string name;
        string bio;
        string profileImage; 
        bool exists;
    }

    mapping(address => User) public users;

    event UserProfileCreated(address indexed user, string name, string bio, string profileImage);
    event UserProfileUpdated(address indexed user, string name, string bio, string profileImage);

    function createUserProfile(
        string memory _name,
        string memory _bio,
        string memory _profileImage
    ) external {
        require(!users[msg.sender].exists, "User already registered");

        users[msg.sender] = User(_name, _bio, _profileImage, true);
        emit UserProfileCreated(msg.sender, _name, _bio, _profileImage);
    }

    function updateUserProfile(
        string memory _name,
        string memory _bio,
        string memory _profileImage
    ) external {
        require(users[msg.sender].exists, "User not registered");

        users[msg.sender].name = _name;
        users[msg.sender].bio = _bio;
        users[msg.sender].profileImage = _profileImage;
        
        emit UserProfileUpdated(msg.sender, _name, _bio, _profileImage);
    }

    function getUserProfile(address _user) external view returns (string memory, string memory, string memory) {
        require(users[_user].exists, "User not registered");
        return (users[_user].name, users[_user].bio, users[_user].profileImage);
    }
}
