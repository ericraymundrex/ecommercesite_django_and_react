import { Fragment } from "react";
import styles from './Base.module.css'
const Base=()=>{
    const Base={
        "title":"Ecommerce Site",
        "description":"This is created by Eric for Innovaccer Training Assignment. The frontend is in React and the backend is in the Django.",
        "className":"bg-dark text-white p-4"
    }
    return(
        <Fragment>
            <div className={styles.base+" container-fluid"}>
                <div className="text-center">
                    <h2 className="pt-3">
                        {Base.title}
                    </h2>
                    <p className="lead">{Base.description}</p>
                    <footer className="footer mt-auto py-3">
                    <div className="container-fluid text-center py-3">
                        <h4>Contact me!</h4>
                        <button className="btn btn-success btn-lg">Contact Me</button>

                    </div>
                </footer>
                </div>


            </div>
        </Fragment>
    )
}

export default Base;