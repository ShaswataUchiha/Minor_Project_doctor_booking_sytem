import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {BASE_URL, token} from "./../../config"
import { toast } from "react-toastify";

const Profile = ({doctorData}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    experience: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    timeSlots: [{ day: "", staartingTime: "", endingTime: "" }],
    about: "",
  });

  useEffect(()=> {
    setFormData({
      name: doctorData.name,
      email: doctorData.email,
      phoneNumber: doctorData.phoneNumber,
      bio: doctorData.bio,
      gender: doctorData.gender,
      specialization: doctorData.specialization,
      ticketPrice: doctorData.ticketPrice,
      experience: doctorData.experience,
      qualifications: doctorData.qualifications,
      timeSlots: doctorData.timeSlots,
      about: doctorData.about,
    })
  }, [doctorData])

  const handelInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfileHandeler = () => {
    e.preventDefault();
  };

  // Custom function for adding itme
  const addItme = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  // Resusable function for delete item
  const deleteItem = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key] : prevFormData[key].filter((_, i) => i !== index)
    }))
  }

  const handleResusableInputChange = (key, event, index) => {
    const {name, value} = event.target;

    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]]
      updateItems[index][name] = value;

      return{
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItme("qualification", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem('qualification', index)
  }

  const handleQualificationChange = (event, index) => {
    handleResusableInputChange('qualification', event, index)
  }

  const addExperience = (e) => {
    e.preventDefault();

    addItme("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem('experiences', index)
  }

  const handleExperienceChange = (event, index) => {
    handleResusableInputChange('experiences', event, index)
  }

  const addTimeSlot = (e) => {
    e.preventDefault();

    addItme("timeSlots", {
      day : "",
      startingTime: "",
      endingTime: "",
    });
  };

  const deleteTimeslot = (e, index) => {
    e.preventDefault();
    deleteItem('timeSlots', index)
  }

  const handleTimeSlotChange = (event, index) => {
    handleResusableInputChange('timeSlots', event, index)
  }

  const updateProfileHAndeler = async (e) => {
    e.preventDefault();
    // Make API call to update the profile
    try {
      const res = await fetch(`${BASE_URL}/doctor/updateDoctor/${doctorData._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error("Failed to update profile");
        console.log(result.message)
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      
    }
  }

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handelInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email*</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handelInputChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Phone*</p>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handelInputChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handelInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="from__label">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handelInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="from__label">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handelInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgen">Surgen</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div>
              <p className="form__label">Ticket Price</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handelInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">Oualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={e => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={e => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">Degree</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={e => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="from__label">University</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      onChange={e => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>

                <button onClick={e => deleteQualification(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Add qualifications
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experience</p>
          {formData.experience?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={e => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="from__label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={e => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">position</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      onChange={e => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="from__label">Hospital</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      onChange={handelInputChange}
                      className="form__input"
                    />
                  </div>
                </div>

                <button onClick={e => deleteExperience(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="from__label">Day*</p>
                    <select
                      onChange={e => handleTimeSlotChange(e, index)}
                      name="day"
                      id=""
                      value={item.day}
                      className="form__input py-3.5"
                    >
                      <option value="">Select</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <p className="from__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div className="flex items-center">
                    <button
                    onClick={e => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] 
                    mb-[30px] mt-6"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
           onClick={addTimeSlot} 
           className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Add Time Slot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea
            name=""
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handelInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mt-7">
          <button
            className="bg-blue-600 text-white text-[20px]
          leading-[30px] w-full py-3 px-4 rounded-lg"
            type="submit"
            onClick={updateProfileHandeler}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
