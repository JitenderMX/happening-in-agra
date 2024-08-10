import hero from '../assets/hero.jpg'
import work1 from '../assets/work-1.png'
import work2 from '../assets/work-2.png'
import work3 from '../assets/work-3.png'
import work4 from '../assets/work-4.png'
import workRight from '../assets/work-right.png'
import profile from '../assets/profile.jpg'
import happenImg from '../assets/happen-img.png'
import upImg from '../assets/up-img.png'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase.config'; // Adjust the import according to your file structure
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
function Home() {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    useEffect(() => {
        console.log(auth.currentUser)
        setUser(auth.currentUser)
    }, [])

    /*
    function griefInput() {
        const griefPerson1 = document.querySelector('.greif-input')
        let griefPerson1Value = griefPerson1.value
        document.querySelector('.boobit-greif').textContent = griefPerson1Value
    }
    function SetPrefix() {
        const prefixSelect = document.querySelector('#prefix-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-prefix').textContent = prefixSelectValue
    } 
    function SetService() {
        const prefixSelect = document.querySelector('#service-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-service').textContent = prefixSelectValue
    }
    function SetServiceTimeSelect() {
        const prefixSelect = document.querySelector('#service-time-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-time').textContent = prefixSelectValue
    }
    function enterNameOfDeceased() {
        const nameOfDeceased = document.querySelector('#name-of-deceased')
        const nameOfDeceasedValue = nameOfDeceased.value
        document.querySelector('.boobit-n-t').textContent = nameOfDeceasedValue
    }
   

    
    function enterAddress() {
        const address = document.querySelector('#address')
        const addressValue = address.value
        console.log("entering")
        document.querySelector('.boobit-address').textContent = addressValue;
    }
    function addGriefPerson() {
        // Check the number of input fields
        if ($('.greif-input').length >= 3) {
            alert('You can only add up to 3 input fields.');
            return;
        }
        else {
            var newInput = `
               <div class="d-flex gap-3 mb-3">
                    <input type="text" class="form-control greif-input" id="address" placeholder="Person in greif"  onInput={ griefInput}/>
                        <div class="form-control w-auto" onClick={ addGriefPerson }>
                        <i class="fal fa-plus fa-plus-icon"></i></div></div>
            `;
            $('.greif').append(newInput);



            $('.greif').on('focusout', '.greif-input', function () {
                var value = $(this).val().trim();
                if (value) {
                    var currentText = $('.boobit-greif').text();
                    if (currentText) {
                        currentText += ' | ' + value;
                    } else {
                        currentText = value;
                    }
                    $('.boobit-greif').text(currentText);
                }
            })

        }


    }
    */
    function fileUpload(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#boobit-up-img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }


    /*  const handleImageChange = (e) => {
         if (e.target.files[0]) {
             setImage(e.target.files[0]);
         }
     }; */
    // async function handleClick() {
    //     try {
    //         const canvas = await html2canvas(document.querySelector('.boobit-img'), { scale: 2 });
    //         const dataURL = canvas.toDataURL('image/jpg'); // Get the image data as a base64 URL
    //         const storage = getStorage()
    //         const storageRef = ref(storage, 'boobit-img.jpg'); // Create a reference to the image file in Firebase Storage
    //         const auth = getAuth()
    //         // Upload the base64 URL to Firebase Storage
    //         await uploadString(storageRef, dataURL, 'data_url');
    //         const downloadURL = await getDownloadURL(storageRef);

    //         console.log('Uploaded a base64 string!');
    //         toast.success('Image uploaded successfully!');

    //         // Save the download URL and other data to Firestore
    //         await addDoc(collection(db, 'listings'), {
    //             email: auth.currentUser.email, // Save the provided email
    //             name: auth.currentUser.displayName, // Save the provided number
    //             imageUrl: downloadURL,
    //         });

    //         toast.success('Data saved successfully!');
    //     } catch (error) {
    //         toast.error('Error:', error);
    //     }
    // }
    const navigate = useNavigate()
    const logoutHandler = () => {
        auth.signOut()
        navigate('/sign-in')
    }
    const [prefix, setPrefix] = useState(null)
    const [nameOfDeceased, setNameOfDeceased] = useState(null)
    const [memoService, setMemoService] = useState(null)
    const [serviceTime, setServiceTime] = useState(null)
    const [serviceAddress, setServiceAddress] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [dateOfDeath, setDateOfDeath] = useState(null)
    const [dateOfService, setDateOfService] = useState(null)
    const [griefPerson1, setGriefPerson1] = useState(false)
    const [griefPerson2, setGriefPerson2] = useState(false)
    const [griefPersonText1, setGriefPersonText1] = useState(null)
    const [griefPersonText2, setGriefPersonText2] = useState(null)
    const [griefPersonText3, setGriefPersonText3] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)


    function handleClick() {
        /*  html2canvas(document.querySelector('.boobit-img'), {
             scale: 2 // Double the scale for capturing
         }).then(function (canvas) {
             // Download the scaled canvas content as an image
             const link = document.createElement('a');
             link.href = canvas.toDataURL('image/jpg'); // Set the image format (e.g., 'image/jpeg')
             link.download = 'boobit-img.jpg'; // Set the filename for download
             link.click();
         }).catch(function (error) {
             toast.error('Error capturing the section:', error);
         }); */
        html2canvas(document.querySelector('.boobit-img'),{  scale: 2 }).then(function (canvas) {
            canvas.toBlob(function (blob) {
                const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                // $('#formFileLg')[0].files = dataTransfer.files;
                // const image = $('#formFileLg')[0].files
                const image = dataTransfer.files
                console.log(image[0])
                // console.log(image[0])
                setImageUpload(image[0])
                // console.log(dataTransfer.files)
                if (imageUpload == null) {
                    return false
                }
                const storage = getStorage()
                const imageRef = ref(storage, `images/${uuidv4()}.jpg`)
                /*  uploadBytes(imageRef, imageUpload).then(() => {
                     // alert('File Uplod')
                     const auth = getAuth()
                     getDownloadURL(imageRef).then(async (url) => {
                         const listingData = {
                             name: auth.currentUser.displayName,  // Replace with actual data
                             gmail: auth.currentUser.email,  // Replace with actual data
                             dateOfPosting: "",
                             postStatus: true,
                             payment: false,
                             imageUrl: url
                         };
 
                         try {
                             const docRef = await setDoc(doc(db, "listings", auth.currentUser.uid), listingData);
                             console.log("Document written with ID: ", docRef.id);
                             alert('File Uploaded and Listing Created');
                         } catch (e) {
                             console.error("Error adding document: ", e);
                             toast.error('Error adding document:', e);
                         }
                     }).catch((error) => {
                         console.error('Error getting download URL:', error);
                         toast.error('Error getting download URL:', error);
                     });
                 }) */
                uploadBytes(imageRef, imageUpload).then(() => {
                    // File uploaded successfully, now get the download URL
                   /*  getDownloadURL(imageRef).then(async (url) => {
                        const auth = getAuth();
                        const listingData = {
                            userId: auth.currentUser.uid,  // Replace with actual data
                            name: auth.currentUser.displayName,  // Replace with actual data
                            gmail: auth.currentUser.email,  // Replace with actual data
                            dateOfPosting: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), // Format the date
                            postStatus: true,
                            payment: false,
                            imageUrl: url
                        };
                        console.log(listingData)
                        const docRef = doc(db, "listings", auth.currentUser.uid);
                        setDoc(docRef, listingData)
                            .then(() => {
                                console.log("Document written with ID: ");
                                alert('File Uploaded and Listing Created'); // Consider using toast instead
                            })
                            .catch((error) => {
                                console.log("Error adding document");
                                toast.error('Error creating listing');
                            });
                    }).catch((error) => {
                        console.log('Error getting download URL:', error);
                        toast.error('Error getting download URL:', error.message); // Corrected error display
                    }); */
                    getDownloadURL(imageRef).then(async (url) => {
                        try {
                            const auth = getAuth();
                            if (!auth.currentUser) {
                                throw new Error("User not authenticated");
                            }
                    
                            const listingData = {
                                userId: auth.currentUser.uid,
                                name: auth.currentUser.displayName,
                                gmail: auth.currentUser.email,
                                dateOfPosting: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                                postStatus: true,
                                payment: false,
                                imageUrl: url
                            };
                    
                            console.log(listingData);
                    
                            const docRef = doc(db, "listings", auth.currentUser.uid);
                            await setDoc(docRef, listingData);
                    
                            console.log("Document written with ID: ", auth.currentUser.uid);
                            alert('File Uploaded and Listing Created'); // Consider using toast instead
                            navigate('/pick-date')
                        } catch (error) {
                            console.error("Error adding document: ", error);
                            toast.error('Error creating listing: ' + error.message);
                        }
                    }).catch((error) => {
                        console.error('Error getting download URL:', error);
                        toast.error('Error getting download URL: ' + error.message);
                    });
                    
                }).catch((error) => {
                    console.log('Error uploading file:', error);
                    toast.error('Error uploading file:', error.message); // Added catch block for file upload errors
                });

                // console.log(dataTransfer.files)
            }, 'image/jpeg');
        }).catch(function (error) {
            console.log('Error capturing the section:', error);
        });
    };

    return (
        <>
            {/* <!-- Header Section Start --> */}
            <header id="header" className='p-4'>
                {/* <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                        <h3 className='m-0'>{user.displayName}</h3> 
                        <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                    </div> */}
                <div className="">
                    <div className=""> {user ? (<>

                        <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                            <h3 className='m-0'>{user.displayName}</h3>
                            <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                        </div>
                    </>) : (<Link to='/sign-in' className='btn btn-primary'>Sign In</Link>)}</div>
                </div>
            </header>
            {/* <!-- Header Section End --> */}
            <main>
                {/* <!-- Hero Section Start --> */}
                <section class="hero">
                    <div class="container-xxl">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-8 col-sm-10">
                                <h1>Register Obituary on Agra's Most Happening Community Page</h1>
                            </div>
                            <div class="col-12"><img src={hero} class="w-100" alt="" /></div>
                        </div>
                    </div>
                </section>
                {/* <!-- Hero Section End --> */}

                {/* <!-- How It Works Section Start --> */}
                <section class="how-it-works">
                    <div class="container-xxl">
                        <div class="hoitwo-box">
                            <div class="mb-3 mb-sm-5 text-center">
                                <h2>How it works</h2>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="row justify-content-around">
                                        <div class="col-sm-5 p-0">
                                            <div class="hoitwo-con">
                                                <div class="hoitwo-img p-2"><img src={work1} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work2} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work3} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work4} alt="" class="w-100" /></div>
                                            </div>
                                            <div class="mt-2 text-center d-flex">
                                                <a href="#book-obituary" class="th-btn fill">Register Now</a>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 mt-4 mt-sm-0 p-0"><img src={workRight} alt="" class="w-100" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hoitwo-pera">
                            <p>We understand the importance of honoring the lives of those who have passed away, and our
                                platform offers a compassionate space for you to share their stories. </p>
                        </div>
                    </div>
                </section>
                {/* <!-- How It Works Section End --> */}


                {/* <!-- Book an Obituary Section Start --> */}
                <section class="book-obituary" id="book-obituary">
                    <div class="container-xxl">
                        <div class="boobit-container">
                            <div class="boobit-box">
                                <div class="row justify-content-center">
                                    <div class="col-lg-6 col-md-8 col-sm-10">
                                        <h2 class="text-center mb-4">Book an Obituary</h2>
                                        <p class="text-center mb-4">Provide details and upload an image to create a personalised
                                            obituary. Fill the form below.</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-7 order-md-1">
                                        <div class="boobit-left d-flex flex-column mb-5">
                                            <div id="boobit-img" class="boobit-img">
                                                <div class="boobit-head">in loving memory of </div>
                                                <div class="boobit-img"><img src={profile} class="w-100"
                                                    id="boobit-up-img" alt="" /></div>
                                                <div class="boobit-text">
                                                    <div class="boobit-name">
                                                        <div class="boobit-prefix">{prefix ? prefix : 'Mr.'}</div>
                                                        <div class="boobit-n-t">{nameOfDeceased ? nameOfDeceased : 'Kalash Singh'}</div>
                                                    </div>
                                                    <div class="boobit-life-spam">
                                                        <div class="boobit-date-of-birth">
                                                            {dateOfBirth ? format(dateOfBirth, 'do MMMM, yyyy') : '20th April, 1883'}
                                                            {/* {dateOfBirth? dateOfBirth.toLocaleDateString('en-GB') : '20th April, 1883'} */}
                                                        </div>
                                                        <div class="">-</div>
                                                        <div class="boobit-date-of-death">
                                                            {dateOfDeath ? format(dateOfDeath, 'do MMMM, yyyy') : '19th April, 1945'}
                                                        </div>
                                                    </div>
                                                    <div class="boobit-service">{memoService ? memoService : 'Memorial Service'}</div>
                                                    <div class="boobit-details">
                                                        <div class="boobit-time"> {serviceTime ? serviceTime : '10am - 12:30pm'}</div>
                                                        <div class="">|</div>
                                                        <div class="boobit-date">
                                                            {dateOfService ? format(dateOfService, 'do MMMM, yyyy') : '20th April, 1883'}
                                                        </div>
                                                        <div class="">|</div>
                                                        <div class="boobit-address">{serviceAddress ? serviceAddress : 'Surya Nagar Mandir, Agra'}</div>
                                                    </div>
                                                </div>
                                                <div class="boobit-h-grif">
                                                    In Grief
                                                </div>
                                                <div class="boobit-greif">

                                                    {griefPersonText1 ? `${griefPersonText1} | ` : 'Natasha Singh | '}
                                                    {griefPersonText2 ? ` ${griefPersonText2}` : ' Prem Singh'}
                                                    {griefPersonText3 ? ` | ${griefPersonText3}` : ''}
                                                </div>
                                                <div class="boobit-happening">
                                                    <img src={happenImg} alt="" class="w-100" id="happening-img" />
                                                </div>
                                            </div>
                                            {/* <div id="apply-change" onClick={handleClick} class="th-btn outline">
                                                Apply Changes
                                            </div> */}
                                        </div>
                                    </div>
                                    <div class="col-md-5 order-md-0">
                                        <div class="boobit-right">
                                            <form action="" method="post">
                                                <div class="mb-3">
                                                    <select class="form-select" name="prefix" id="prefix-select" value={prefix} onChange={(pfix) => setPrefix(pfix.target.value)}>
                                                        <option selected>Select Prefix</option>
                                                        <option value="Mr.">Mr.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                        <option value="Miss">Miss</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Shri">Shri</option>
                                                        <option value="Sri">Sri</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" maxLength='21' id="name-of-deceased" value={nameOfDeceased}
                                                        placeholder="Name of deceased" onChange={(prev) => setNameOfDeceased(prev.target.value)} />
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfBirth}
                                                        onChange={(date) => setDateOfBirth(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Birth'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        maxDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="dateOfBirth"
                                                        placeholder="Date of Birth" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfDeath}
                                                        onChange={(date) => setDateOfDeath(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Death'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        maxDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="date-of-death"
                                                        placeholder="Date of Death" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-select" value={memoService} onChange={(memo) => setMemoService(memo.target.value)}>
                                                        <option selected>Service</option>
                                                        <option value="Memorial1">Memorial1</option>
                                                        <option value="Memorial2">Memorial2</option>
                                                        <option value="Memorial3">Memorial3</option>
                                                        <option value="Memorial4">Memorial4</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-time-select" value={serviceTime} onChange={(time) => setServiceTime(time.target.value)}>
                                                        <option selected>Time of service</option>
                                                        <option value="10 am - 12:30 pm">10 am - 12:30 pm</option>
                                                        <option value="11 am - 12:30 pm">11 am - 12:30 pm</option>
                                                        <option value="12 am - 12:30 pm">12 am - 12:30 pm</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfService}
                                                        onChange={(date) => setDateOfService(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Service'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        minDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="date-of-service"
                                                        placeholder="Date of Service" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" id="address" placeholder="Address" value={serviceAddress}
                                                        maxLength="24" onChange={(addr) => setServiceAddress(addr.target.value)} />
                                                </div>
                                                <div class="">
                                                    <div class="greif">
                                                        <div class="d-flex gap-3 mb-3">
                                                            <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText1} onChange={(prev) => setGriefPersonText1(prev.target.value)} placeholder="Person in greif" />
                                                            <div class="form-control w-auto" onClick={() => { setGriefPerson1(true) }}><i
                                                                class="fal fa-plus fa-plus-icon"></i></div>
                                                        </div>
                                                        {griefPerson1 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText2} onChange={(prev) => setGriefPersonText2(prev.target.value)} placeholder="Person in greif" />
                                                                <div class="form-control w-auto" onClick={() => { setGriefPerson2(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson2 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText3} onChange={(prev) => setGriefPersonText3(prev.target.value)} placeholder="Person in greif" />
                                                                <div class="form-control w-auto" onClick={() => { alert("You can not add more then 3") }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label htmlFor="up-img" class="up-img">
                                                        <img src={upImg} alt="" />
                                                    </label>
                                                    <input class="form-control position-fixed opacity-0" type="file"
                                                        id="up-img" onInput={fileUpload} />
                                                </div>

                                                {/* <input class="form-control form-control-lg"  id="formFileLg" onChange={(e)=>setImage(e.target.files[0])} type="file" /> */}
                                                <input class="form-control form-control-lg" id="formFileLg" type="file" />
                                            </form>
                                        </div>
                                    </div>

                                    <div class="col-12 d-flex justify-content-center my-4 order-md-2" onClick={handleClick}>
                                        <div class="th-btn fill">Proceed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Book an Obituary Section End --> */}





            </main>
        </>
    )
}

export default Home