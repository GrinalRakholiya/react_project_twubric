import React, { useState, useEffect } from "react";
import Header from "./Header"; // Corrected import statement

function UserGrid() {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState(null); // Initialize sortBy state to null
    const [sortOrder, setSortOrder] = useState({}); // Initialize sortOrder state to an empty object

    useEffect(() => {
        fetch(
            "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
        )
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching or parsing JSON:", error);
            });
    }, []);

    const handleSortChange = (sortBy) => {
        setSortBy(sortBy);
        setSortOrder((prevSortOrder) => {
            return { ...prevSortOrder, [sortBy]: prevSortOrder[sortBy] === "asc" ? "desc" : "asc" };
        });
    };

    const sortUsers = (sortBy) => {
        return [...users].sort((a, b) => {
            if (sortOrder[sortBy] === "asc") {
                return a.twubric[sortBy] - b.twubric[sortBy];
            } else {
                return b.twubric[sortBy] - a.twubric[sortBy];
            }
        });
    };

    const sortedUsers = sortBy ? sortUsers(sortBy) : users; // Sort only if sortBy is not null

    const removeUser = (username) => {
        const isConfirmed = window.confirm("Do you want to remove this user?");
        if (isConfirmed) {
            setUsers(users.filter((user) => user.username !== username));
        }
    };

    return (
        <div>
            <Header handleSortChange={handleSortChange} />
            <div id="userGrid">
                {sortedUsers.map((user) => (
                    <div className="user-card" key={user.username}>
                        <div className="user-info">
                            <div className="user-username">
                                {user.fullname}
                                <span className="total-badge">{user.twubric.total}</span>
                            </div>
                            <div className="user-image-stats">
                                <img className="user-image" src={user.image} alt="" />
                                <div className="user-stats">
                                    <div>{user.twubric.friends} Friends</div>
                                    <div>{user.twubric.influence} Influence</div>
                                    <div>{user.twubric.chirpiness} Chirpiness</div>
                                </div>
                            </div>
                            <div className="user-bio">
                                Join Date:{" "}
                                {new Date(user.join_date * 1000).toDateString()}
                                <button className="remove-button" onClick={() => removeUser(user.username)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserGrid;
