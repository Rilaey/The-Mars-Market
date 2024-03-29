import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const navigate = useNavigate();

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className="card sm:w-96 bg-base-100 shadow-xl m-[24px] w-[21rem]">
            <figure><img 
            className="h-[256.67px]" 
            src={props.image} 
            alt="Seller's Item" 
            onClick={() => {
                navigate("/item/" + props.post);
                window.scrollTo(0, 0);
            }}
            style={{ cursor: 'pointer' }} /></figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{props.title}</h2>
                </div>
                <p>{currencyFormat(props.price)}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{props.description}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => {
                        navigate("/item/" + props.post);
                        window.scrollTo(0, 0);
                    }} className="btn btn-primary">View Listing</button>
                </div>
            </div>
        </div>
    );
}