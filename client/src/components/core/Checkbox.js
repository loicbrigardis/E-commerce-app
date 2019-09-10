import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdbreact';

const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckCategoryId = [...checked];
        if (currentCategoryId === -1) {
            newCheckCategoryId.push(c)
        } else {
            newCheckCategoryId.splice(currentCategoryId, 1);
        }
        setChecked(newCheckCategoryId);
        handleFilters(newCheckCategoryId);
    }

    return categories.map((c, i) => (
        <li key={i} style={{ listStyle: "none" }}>
            <input
                onChange={handleToggle(c._id)}
                className="styled-checkbox"
                id={`styled-checkbox-${i}`}
                value={checked.indexOf(c._id === -1)}
                type="checkbox" />
            <label htmlFor={`styled-checkbox-${i}`}>{c.name}</label>
        </li>
    ))
};

export default CheckBox;