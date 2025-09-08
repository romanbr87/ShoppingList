import axios from "axios";
import { useEffect, useState } from "react";

const useCities = () => {
  const url = "https://data.gov.il/api/3/action/datastore_search";

  const [cities, setCities] = useState();
  const [citiesForTypehead, setCitiesForTypehead] = useState();
  const [citiesError, setCitesError] = useState(null)

  const getCities = () => {
    var citisParams = {
      params: {
        resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
        limit: 5000,
      },
    };

    axios.get(url, citisParams).then((data) => {
      const addedCities = data?.data?.result?.records
        .map((e) => String(e["שם_ישוב"]).trim())
        .sort((a, b) => a.localeCompare(b, "he"))
        .filter((e) => e !== "לא רשום")
      // console.log(addedCities);
      setCities(addedCities);
      setCitiesForTypehead(addedCities.map((e, index) => ({ id: index + 1, label: e })));

    });
  }

  useEffect(() => {
    getCities();
  }, []);

  return { cities, citiesForTypehead, citiesError };
};

export default useCities;