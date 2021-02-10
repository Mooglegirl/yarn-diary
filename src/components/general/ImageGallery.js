import "./ImageGallery.scss";

export default function ImageGallery(props) {
	if(!props.images) {
		return <p>(None)</p>;
	}
	
	const imageURLs = props.images.split("\n");

	return (
		<div className="ImageGallery">
			{imageURLs.map((url, index) => (
				<a href={url} target="_blank" rel="noreferrer" key={index} className="ImageGallery__img">
					<img alt="Yarn" src={url} />
				</a>
			))}
		</div>
	);
}