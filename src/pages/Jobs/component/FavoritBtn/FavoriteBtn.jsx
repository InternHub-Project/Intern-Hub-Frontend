import { Button } from "react-bootstrap";
import { MdFavorite } from "react-icons/md";
import "./favorateIcon.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { httpRequest } from "../../../../core/utils/httpRequest.js";

export const FavoriteBtn = ({ jobId }) => {
	const [allFavs, setAllFavs] = useState([]);

	// get all fav
	const getFavsData = () => {
		axios({
			method: "get",
			url: "https://api.codesplus.online/api/v1/user/userfavourite",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM5OTQ3OTEsImV4cCI6MTcxNDA4MTE5MX0.hcvAfC2a5Xjb8-r5h3ephw5SfaT4sCy8rmCAJhh1J88",
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
		try {
			httpRequest(
				"https://api.codesplus.online/api/v1/user/addtofavourite",
				"PUT",
				jobId,
				{
					Authorization:
						"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM5OTQ3OTEsImV4cCI6MTcxNDA4MTE5MX0.hcvAfC2a5Xjb8-r5h3ephw5SfaT4sCy8rmCAJhh1J88",
				}
			).then((result) => {
				console.log(result);
				console.log("remove");
			});
		} catch (e) {
			console.log(e);
		}
	};
	// remove fav
	const removeFromFavourite = (jobId) => {
		try {
			httpRequest(
				"https://api.codesplus.online/api/v1/user/removeFromFavourite",
				"PUT",
				jobId,
				{
					Authorization:
						"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM5OTQ3OTEsImV4cCI6MTcxNDA4MTE5MX0.hcvAfC2a5Xjb8-r5h3ephw5SfaT4sCy8rmCAJhh1J88",
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
		console.log(intern);
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
