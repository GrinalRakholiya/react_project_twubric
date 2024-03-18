import React from 'react';

function Header({ handleSortChange }) {
    return (
        <div>
            <div id="dateRangePicker">
                <label>Start Date:</label>
                <input type="date" id="startDate" />
                <label>End Date:</label>
                <input type="date" id="endDate" />
                <div id="sortByButtons">
                    <label>Sort By:</label>
                    <button onClick={() => handleSortChange('friends')}>Friends</button>
                    <button onClick={() => handleSortChange('influence')}>Influence</button>
                    <button onClick={() => handleSortChange('chirpiness')}>Chirpiness</button>
                    <button onClick={() => handleSortChange('total')}>Total</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
