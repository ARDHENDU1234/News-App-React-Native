import { useCallback, useState } from "react";
import CountryList from "@/constants/CountryList";

export const useNewsCountries = () => {
  const [newsCountries, setNewsCountries] = useState(CountryList);

  const toggleNewsCountry = useCallback((code: string) => {
    setNewsCountries((prevNewsCountries) =>
      prevNewsCountries.map((item) =>
        item.code === code
          ? { ...item, selected: !item.selected }
          : { ...item, selected: false } // Ensure only one country is selected
      )
    );
  }, []);

  return {
    newsCountries,
    toggleNewsCountry,
  };
};
