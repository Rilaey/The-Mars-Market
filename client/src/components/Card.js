import { useLocation } from "react-router-dom";

export default function Card(props) {
    const location = useLocation();

    return (
        <div className="card w-96 glass m-[24px]">
            {location.pathname.includes("profile") ? <div className="flex justify-end p-2">
                <button className="btn btn-circle btn-outline btn-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div> : ""}
            <figure><img className="h-[256.67px]" src={props.image} alt="car!" /></figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{props.title}</h2>
                    <p>{props.price}</p>
                </div>
                <p>{props.description}</p>
                <div className="card-actions justify-end">
                    {location.pathname.includes("profile") ? <button className="btn btn-primary">Edit</button> : <button className="btn btn-primary">Buy Now!</button>}
                </div>
            </div>
        </div>
    );
}