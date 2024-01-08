import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const Loader = ({ loading, text }) => {
    return (
        <Spinner
            visible={loading}
            textContent={text || ""}
            textStyle={{ color: "#FFF" }}
        />
    );
};

export default Loader;
