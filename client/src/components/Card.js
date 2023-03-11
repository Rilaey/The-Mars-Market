
export default function Card(props) {
    return (
        <div className="card w-96 glass m-[24px]">
            <figure><img src={props.image} alt="car!" /></figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{props.title}</h2>
                    <p>{props.price}</p>
                </div>
                <p>{props.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now!</button>
                </div>
            </div>
        </div>
    );
}