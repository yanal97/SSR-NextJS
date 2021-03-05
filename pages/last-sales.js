import useSWR from "swr";
import { useEffect, useState } from "react";
export default function LastSales() {
  const [mydata, setMydata] = useState();
  const { data, error } = useSWR("https://jsonplaceholder.typicode.com/todos/");
  useEffect(() => {
    if (data) {
      setMydata(data);
      console.log(data);
    }
  }, [data]);
  if (error) {
    return <p>Err</p>;
  }

  if (!data) {
    return <p> no data yet </p>;
  }

  if (!mydata) {
    return <p>err</p>;
  }
  return (
    <ul>
      {mydata.map((d) => (
        <li>
          {d.userId} -- {d.title} -- {`${d.completed}`}
        </li>
      ))}
    </ul>
  );
}
