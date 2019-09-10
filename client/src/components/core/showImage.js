import React from 'react';
import { MDBCardImage } from 'mdbreact';

import { API } from '../../config';

const ShowImage = ({ item, url }) => (
    <MDBCardImage style={{ backgroundSize: "cover" }} className="img-fluid" alt={item.name} src={`${API}/${url}/photo/${item._id}`} waves />
)

export default ShowImage;