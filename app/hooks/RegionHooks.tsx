import countries from "world-countries";
import RegionSelect from "../Components/Forms/RegionSelect";

const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const regionHooks = () => {
  const getAll = () => formatedCountries;

  const getByValues = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValues,
  };
};

export default RegionSelect;
