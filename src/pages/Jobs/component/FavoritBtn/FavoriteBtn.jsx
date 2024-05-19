/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import "./favorateIcon.css";
import { useEffect, useState } from "react";
import axios from "axios";

import API_CONFIG from "../../../../core/utils/apiConfig.js";
import { notifications } from "@mantine/notifications";


export const FavoriteBtn = ({ jobId }) => {
	const [allFavs, setAllFavs] = useState([]);
	let token
	if(JSON.parse(localStorage.getItem("userInfo"))){
		token = JSON.parse(localStorage.getItem("userInfo")).data.token;
	}

	// get all fav
	const getFavsData = () => {
		axios({
			method: "get",
			url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.favorite}`,
			headers: {
				"Content-Type": "application/json",
				Authorization:
					`${API_CONFIG.secretKey}${token}`,
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
		console.log(jobId);
		axios({
			method:"put",
			url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.AddToFav}`,
			headers: {
				Authorization:
					`${API_CONFIG.secretKey}${token}`
			},
			data:{jobId}
		}).then((res)=>{
			if(res.status==200){
				notifications.show({message:"Job Add to Fav",color:"green"})
			}
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
					`${API_CONFIG.secretKey}${token}`
			},
			data:{jobId}
		}).then((res)=>{
			if(res.status==200){
				notifications.show({message:"Job Removed From Fav",color:"green"})
			}
			console.log(res);
		}).catch((err=>{
			console.log(err);
		}))


	};

	const onClickFavoriteHandler = () => {
		let intern = allFavs && allFavs.find((itemId) => itemId.jobId === jobId);
		if (!intern) {
			addToFavs(jobId);
		} else {
			removeFromFavourite(jobId);
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