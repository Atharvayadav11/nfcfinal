import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FormControl, FormLabel, FormItem, FormMessage } from '@/components/ui/form'; 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; 
import { Input } from '@/components/ui/input';

const Complaint = () => {
  const [formStep, setFormStep] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);
  const thirdStepRef = useRef(null);
  const fourthStepRef = useRef(null);
  const fifthStepRef = useRef(null);
  const sixthStepRef = useRef(null);
  const seventhStepRef = useRef(null);

  const { control, handleSubmit, watch, getValues } = useForm({
    defaultValues: {
      anonymous: false,
      name: '',
      phoneNumber: '',
      email: '',
      receiveUpdates: false,
      crimeType: '',
      crimeDate: '',
      crimeDescription: '',
      crimeLocation: '',
      victimDetails: false,
      victimName: '',
      victimPhoneNumber: '',
      victimAge: '',
      victimGender: '',
      criminalDetails: false,
      criminalName: '',
      criminalGender: '',
      criminalAge: '',
      criminalPhoneNumber: '',
      criminalPicture: null,
      detailedDescription: '',
      groupsEntities: '',
      pincode: '',
      area: '',
      address: '',
      nearestPoliceStation: '',
      knownReason: '',
      photos: [],
      videos: [],
    }
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Step: Anonymous or Non-Anonymous */}
          <motion.div
            className="space-y-6"
            ref={firstStepRef}
            animate={{ translateX: `${-formStep * 100}%` }}
            transition={{ ease: "easeInOut" }}
          >
            <FormItem>
              <FormLabel>Submit Anonymously</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  {...control.register('anonymous')}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            {!isAnonymous && (
              <motion.div
                className="space-y-6"
                ref={secondStepRef}
                animate={{ translateX: `${-formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="receiveUpdates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receive Updates</FormLabel>
                      <FormControl>
                        <input type="checkbox" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Third Step: Crime Details */}
          {!isAnonymous && (
            <motion.div
              className="space-y-6"
              ref={thirdStepRef}
              animate={{ translateX: `${-formStep * 100}%` }}
              transition={{ ease: "easeInOut" }}
            >
              <Controller
                control={control}
                name="crimeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Crime</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type of crime" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Theft">Theft</SelectItem>
                          <SelectItem value="Assault">Assault</SelectItem>
                          <SelectItem value="Fraud">Fraud</SelectItem>
                          {/* Add other options here */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="crimeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date and Time of Crime</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="crimeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description of the Crime</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe the crime..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="crimeLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Current location..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Fourth Step: Victim Details (Optional) */}
          {watch('victimDetails') && (
            <motion.div
              className="space-y-6"
              ref={fourthStepRef}
              animate={{ translateX: `${-formStep * 100}%` }}
              transition={{ ease: "easeInOut" }}
            >
              <Controller
                control={control}
                name="victimName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Victim's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter victim's name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="victimPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Victim's Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter victim's phone number..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="victimAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Victim's Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter victim's age..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="victimGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Victim's Gender</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Fifth Step: Proposed Criminal Details (Optional) */}
          {watch('criminalDetails') && (
            <motion.div
              className="space-y-6"
              ref={fifthStepRef}
              animate={{ translateX: `${-formStep * 100}%` }}
              transition={{ ease: "easeInOut" }}
            >
              <Controller
                control={control}
                name="criminalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criminal's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter criminal's name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="criminalGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criminal's Gender</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="criminalAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criminal's Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter criminal's age..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="criminalPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criminal's Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter criminal's phone number..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={control}
                name="criminalPicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Criminal's Picture</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Final Step: Additional Details */}
          <motion.div
            className="space-y-6"
            ref={sixthStepRef}
            animate={{ translateX: `${-formStep * 100}%` }}
            transition={{ ease: "easeInOut" }}
          >
            <Controller
              control={control}
              name="detailedDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Provide more details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="groupsEntities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groups/Entities Involved</FormLabel>
                  <FormControl>
                    <Input placeholder="Mention groups or entities..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pincode..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your area..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="nearestPoliceStation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nearest Police Station</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter nearest police station..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="knownReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Known Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter known reason..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photos</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} multiple />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="videos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Videos</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} multiple />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <div className="flex justify-between mt-4">
            {formStep > 0 && (
              <button
                type="button"
                onClick={() => setFormStep(formStep - 1)}
                className="bg-gray-400 text-white py-2 px-4 rounded"
              >
                Previous
              </button>
            )}
            {formStep < 5 ? (
              <button
                type="button"
                onClick={() => setFormStep(formStep + 1)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
