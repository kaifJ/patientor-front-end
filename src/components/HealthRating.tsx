/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import FavoriteIcon from "@material-ui/icons/Favorite";

//eslint-disable-next-line
const HealthRating = (rating: any) => {

    const _rating: number = rating.rating;
    console.log(_rating);

    interface COLOR {
        [key: number]: string
    }

    const Color: COLOR = {
        0: 'green',
        1: 'yellow',
        2: 'orange',
        3: 'red'
    };

    const color = Color[_rating];

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <FavoriteIcon style={{ color }} />
    );
};

export default HealthRating;