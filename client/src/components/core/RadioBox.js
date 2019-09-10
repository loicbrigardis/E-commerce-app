import React, { useState, useEffect } from 'react';
import { MDBInput } from 'mdbreact';

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        handleFilters(e.target.value);
        setValue(e.target.value);
    }

    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                name="styled-radio"
                id={`styled-radiobox-${i}`}
                className="styled-radio"
                value={p._id}
                type="radio" />
            <label htmlFor={`styled-radiobox-${i}`} className="ml-2">{p.name}</label>
        </div>
    ))
};

export default RadioBox;