import SearchBar from "@/app/components/SearchBar"
import JobList from "./JobList"
import { Suspense } from "react"
import Loading from "../loading"



export const metadata = {
    title: 'NextJob | Job',
}

export default function Job() {
    return (
        <main >
            <nav>
                <button className="btn-secondary">Jobs</button>
                {/* <button>Candidates</button> */}
            </nav>

            <div className="jobs-container">
                <div className="jobs-container--left">
                    <SearchBar />
                    <Suspense fallback={<Loading />}>
                        <JobList />
                    </Suspense>
                </div>
                <div className="jobs-container--right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit exercitationem aliquam distinctio deserunt deleniti et. Quisquam exercitationem repellat aliquam corrupti placeat architecto nostrum. Molestiae aspernatur, aliquam repudiandae maxime sint aliquid!</p>
                </div>
            </div>

        </main>
    )
}
