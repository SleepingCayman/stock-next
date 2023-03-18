import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSdataPage() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const saveSdata = async (data) => {
        const response = await fetch('/api/sdatas/suppliers', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Sdata saved")
            window.location.href = "/sdatas"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <div style={{ margin: '1rem' }}>
            <form onSubmit={handleSubmit(saveSdata)}>
                <h1>New Sdata</h1>
                <label htmlFor="supplier">Supplier</label><br />
                <input id="supplier" {...register("supplier", { required: true })} placeholder="Sdata Supplier" /><br />

                <label htmlFor="address">Address</label><br />
                <input id="address" {...register("address", { required: true })} placeholder="Sdata Supplier" /><br />
                <label htmlFor="phone">Phone</label><br />
                <textarea id="phone" {...register("phone")} placeholder="Phone number" /><br />
                <input type="submit" />
                <p>{data}</p><br />
            </form>
        </div>
    );
}