import React from 'react';

export default function VideoThumbnail(props) {
	const { title, thumbnail } = props;

	// thumbnail is an array of objects holding url, width, & height
	// 0: {url: "https://i.ytimg.com/vi/fssFXlNk6vw/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLD9-dcdSrjwCC8c5k6m9YxBbdE8YA", width: 168, height: 94}
	// 1: {url: "https://i.ytimg.com/vi/fssFXlNk6vw/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLDm96c4zo9JE7Su7T5Uiu1SnWSkGg", width: 196, height: 110}
	// 2: {url: "https://i.ytimg.com/vi/fssFXlNk6vw/hqdefault.jpg?s…j0AgKJDeAE=&rs=AOn4CLCqYu4BGUORFRIjzGLMlhX_BPV_ZQ", width: 246, height: 138}
	// 3: {url: "https://i.ytimg.com/vi/fssFXlNk6vw/hqdefault.jpg?s…j0AgKJDeAE=&rs=AOn4CLB-TCtS4lLcyCd3tZ2rHynkxULUSw", width: 336, height: 188}

	return (
		<div>
			<button id='show-button' type='button'>
				Show Youtube Video
			</button>

			<div>
				<img
					src='https://i.ytimg.com/vi/fssFXlNk6vw/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLD9-dcdSrjwCC8c5k6m9YxBbdE8YAf'
					alt='168x94'
				/>
			</div>
		</div>
	);
}
