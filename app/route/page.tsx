import React from 'react'

export default function Page() {

    const key = 'AIzaSyDpha8b_47yQuDHEU-rgo8vfvqv-omZaPY'; // process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const src = `https://www.google.com/maps/embed/v1/directions?key=${key}&origin=284+Freshwater+Road,St.+John's,NL&destination=Bowring+Park,St.+John's,NL&waypoints=284+Freshwater+Road,St.+John's,NL|Bannerman+Park,St.+John's,NL&mode=driving`;
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <iframe
            title="Google Maps Directions"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`${src}&zoom=14&maptype=roadmap`}
            allowFullScreen
            ></iframe>
        </div>
    );
}
