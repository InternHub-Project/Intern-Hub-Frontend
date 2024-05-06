/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { MdFavorite } from "react-icons/md";
import "./favorateIcon.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_CONFIG from "../../../../core/utils/apiConfig.js";

export const FavoriteBtn = ({ jobId }) => {
	const [allFavs, setAllFavs] = useState([]);
	const data = JSON.parse(localStorage.getItem("userInfo")).data.token;
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
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	console.log(allFavs);
	useEffect(() => {
		getFavsData();
	}, []);

	// add fav
	const addToFavs = () => {
		axios({
			method:"put",
			url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.addToFavs}`,
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
	
		axios({
			method:"put",
			url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.RemoveFromFav}`,
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
				className="btn favorate-icon"
				onClick={() => onClickFavoriteHandler()}
			>
				<MdFavorite />
			</Button>
		</div>
	);
};

export default FavoriteBtn;
