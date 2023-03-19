export default function Slide(props) {

    return (
        <div id={"slide" + props.index} className="carousel-item relative w-full sm:h-[500px] h-[250px]">
            <img src={props.postImg} className="w-full h-full" />
            {props.singleImg ? "" : <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={"#slide" + props.previous} className="btn btn-circle">❮</a>
                <a href={"#slide" + props.next} className="btn btn-circle">❯</a>
            </div>}
        </div>
    );
}