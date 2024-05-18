/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import "./favorateIcon.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { httpRequest } from "../../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../../core/utils/apiConfig.js";


export const FavoriteBtn = ({ jobId }) => {
	const [allFavs, setAllFavs] = useState([]);
	let data
	if(JSON.parse(localStorage.getItem("userInfo"))){
		data = JSON.parse(localStorage.getItem("userInfo")).data.token;

	}

	// get all fav
	const getFavsData = () => {
		axios({
			method: "get",
			url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.favorite}`,
			headers: {
				"Content-Type": "application/json",
				Authorization:
					`${API_CONFIG.secretKey}${data}`,
			},
		})
			.then((res) => {
				setAllFavs(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getFavsData();
	}, []);

	// add fav
	const addToFavs = () => {
		axios({
			method:"put",

			url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.AddToFav}`,

			headers: {
				Authorization:
					`${API_CONFIG.secretKey}${data}`
			},
			data:{jobId}
		}).then((res)=>{
			console.log(res);
		}).catch((err=>{
			console.log(err);
		}))
	};
	// remove fav
	const removeFromFavourite = (jobId) => {

		try {
			httpRequest(
			`	${API_CONFIG.endpoints.user.RemoveFromFav}`,
				"PUT",
				jobId,
				{
					Authorization:
						`${API_CONFIG.secretKey}${data?.token}`
				}
			).then((result) => {
				console.log(result);
				console.log("remove");
			});
		} catch (e) {
			console.log(e);
		}


	};

	const onClickFavoriteHandler = () => {
		let intern = allFavs && allFavs.find((itemId) => itemId.jobId === jobId);
		if (!intern) {
			addToFavs();
		} else {
			removeFromFavourite();
		}
	};

	return (
		<div>
			<Button
				className="btn  favorate-icon"
				// variant="outline-primary"
				onClick={() => onClickFavoriteHandler()}
			>
				<i className="fa-regular fa-bookmark"></i>
			</Button>
		</div>
	);
};

export default FavoriteBtn;