// Header.js
import React from 'react';

function Header({ handleSortChange }) {
    return (
        <div>
            <div id="dateRangePicker">
                <label>Start Date:</label>
                <input type="date" id="startDate" />
                <label>End Date:</label>
                <input type="date" id="endDate" />
                <label id="sortLabel">Sort By:</label>
                <select id="sortByMenu" onChange={handleSortChange}>
                    <option value="friends">Friends</option>
                    <option value="influence">Influence</option>
                    <option value="chirpiness">Chirpiness</option>
                    <option value="total">Total</option>
                </select>
            </div>
        </div>
    );
}

export default Header;
