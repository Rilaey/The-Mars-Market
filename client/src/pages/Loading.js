import { QUERY_POST } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

export default function Loading() {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: id }
    });

    const post = data?.post || {};

    return (
        <div className="flex justify-center items-center text-center min-h-[95vh]">
            <button className="btn btn-square loading"></button>
        </div>
    );

}
