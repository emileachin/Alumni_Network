<div>
                    First Name: {alumnus.firstName}
                </div>
                <div>
                    Last Name: {alumnus.lastName}
                </div>
                <div>
                    Username: {alumnus.username}
                </div>



<div>
                    User Type: {alumnus.userType}
                </div>
                <div>
                    High School Graduation Year: {alumnus.highschoolGraduationYear}
                </div>
                {alumnus.postSecondaryInstuition && <div>
                    Post Secondary Instuition: {alumnus.postSecondaryInstuition}
                </div>}
                {alumnus.postSecondaryGradYear && <div>
                    Post Secondary Grad Year: {alumnus.postSecondaryGradYear}
                </div>}
                <button type="button" onClick={setJobToggle(!jobToggle)}>Add Job</button>
                {jobToggle && 
                <></>