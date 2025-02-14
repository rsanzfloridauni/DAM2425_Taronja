export const getData = async (url) => {
  try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return (jsonResponse);
      } else {
        return false;
      }
    } catch (error) {
      return console.log(error);
    }
};
export default getData;