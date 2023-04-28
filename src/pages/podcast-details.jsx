import React from "react";
import {
  useLoaderData,
} from "react-router-dom";

export function Component() {
        
    let data = useLoaderData();
    
    return(
        <div>
            <h2>Detalles de podcast</h2>
            {JSON.stringify(data)}
        </div>
    );
}
