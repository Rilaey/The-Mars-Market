import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const navigate = useNavigate();

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className="card sm:w-96 glass m-[24px] w-[21rem]">
            <figure><img className="h-[256.67px]" src={props.image} alt="car!" /></figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{props.title}</h2>
                </div>
                <p>{currencyFormat(props.price)}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{props.description}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => {
                        navigate("/item/" + props.post)
                    }} className="btn btn-primary">Buy Now!</button>
                </div>
            </div>
        </div>
    );
}