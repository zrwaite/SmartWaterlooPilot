const genderOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Male", label: "Male"},
	{ value: "Female", label: "Female"},
	{ value: "Trans-Male to Female", label: "Trans-Male to Female"},
	{ value: "Trans-Female to Male", label: "Trans-Female to Male"},
	{ value: "Two Spirit", label: "Two Spirit"},
	{ value: "Do Not Know", label: "Do Not Know"},
	{ value: "Prefer Not to Answer", label: "Prefer Not to Answer"},
	{ value: "Other", label: "Other"},
]

const religionOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Muslim", label: "Muslim"},
	{ value: "Jewish", label: "Jewish"},
	{ value: "Atheist", label: "Atheist"},
	{ value: "Agnostic", label: "Agnostic"},
	{ value: "Scientologist", label: "Scientologist"},
	{ value: "Buddhist", label: "Buddhist"},
	{ value: "Sikh", label: "Sikh"},
	{ value: "Hindu", label: "Hindu"},
	{ value: "Taoism", label: "Taoism"},
	{ value: "Jainism", label: "Jainism"},
	{ value: "Satanist", label: "Satanist"},
	{ value: "Spiritual", label: "Spiritual"},
	{ value: "Other", label: "Other"}
]
const sexualityOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Asexual", label: "Asexual" },
	{ value: "Bisexual", label: "Bisexual" },
	{ value: "Heterosexual", label: "Heterosexual" },
	{ value: "Demisexual", label: "Demisexual" },
	{ value: "Lesbian", label: "Lesbian" },
	{ value: "Gay", label: "Gay" },
	{ value: "Pansexual", label: "Pansexual" },
	{ value: "Aromantic", label: "Aromantic" },
	{ value: "Bicurios", label: "Bicurios" },
	{ value: "Questioning", label: "Questioning" },
	{ value: "Fluid", label: "Fluid" },
	{ value: "Other", label: "Other" }
]
const raceOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Asian-East", label: "Asian-East" },
	{ value: "Asian-South", label: "Asian-South" },
	{ value: "Asian-South East", label: "Asian-South East" },
	{ value: "Black-African", label: "Black-African" },
	{ value: "Black-North American", label: "lack-North American" },
	{ value: "First Nations", label: "First Nations" },
	{ value: "Indian-Caribbean", label: "Indian-Caribbean" },
	{ value: "Indigenous/Aboriginal", label: "Indigenous/Aboriginal" },
	{ value: "Inui", label: "Inui" },
	{ value: "Latin American", label: "Latin American" },
	{ value: "Metis", label: "Metis" },
	{ value: "Middle European", label: "Middle European" },
	{ value: "White - European", label: "White - European" },
	{ value: "White-North American", label: "White-North American" },
	{ value: "Mixed Heritage", label: "Mixed Heritage" },
	{ value: "Do not know", label: "Do not know" },
	{ value: "Prefer not to answer", label: "Prefer not to answer" },
	{ value: "Other", label: "Other" },
]


const incomeOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "0-14,999", label: "$0-14,999" },
	{ value: "15,000-19,999", label: "$15,000-19,999" },
	{ value: "20,000-24,999", label: "$20,000-24,999" },
	{ value: "25,000-29,999", label: "$25,000-29,999" },
	{ value: "30,000-34,999", label: "$30,000-34,999" },
	{ value: "35,000-39,000", label: "$35,000-39,000" },
	{ value: "40,000-59,999", label: "$40,000-59,999" },
	{ value: "Over 60,000", label: "Over $60,000" },
	{ value: "Do not know", label: "Do not know" },
	{ value: "Prefer not to answer", label: "Prefer not to answer" },
]

const householdCompositionOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Mother Father Child(ren)", label: "Mother Father Child(ren)" },
	{ value: "Couple without children", label: "Couple without children" },
	{ value: "Sole Member", label: "Sole Member" },
	{ value: "Grandparent(s) with Grandchild(ren)", label: "Grandparent(s) with Grandchild(ren)" },
	{ value: "Extended Family", label: "Extended Family" },
	{ value: "Unrelated housemates", label: "Unrelated housemates" },
	{ value: "Siblings", label: "Siblings" },
	{ value: "Sinlge Parent Family (Mother)", label: "Single Parent Family (Mother)" },
	{ value: "Single Parent Family (Father)", label: "Single Parent Family (Father)" },
	{ value: "Same sex couple", label: "Same sex couple" },
	{ value: "Do Not Know", label: "Do Not Know" },
	{ value: "Prefer Not to Answer", label: "Prefer Not to Answer" },
	{ value: "Other", label: "Other" },
]

const heardOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Facebook", label: "Facebook" },
	{ value: "Website", label: "Website" },
	{ value: "Newsletter", label: "Newsletter" },
	{ value: "City Activities Guide", label: "City Activities Guide" },
	{ value: "Word of Mouth", label: "Word of Mouth" },
	{ value: "Flyer from School", label: "Flyer from School" },
	{ value: "Internet search", label: "Internet search" },
	{ value: "Friend", label: "Friend" },
	{ value: "Other", label: "Other" },
]

const contactOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Email", label: "Email" },
	{ value: "Phone", label: "Phone" },
]
type ProfileFormGridState = {
	birth_day: string,
	height: string,
	weight: string,
	grade: string,
	postalCode: string,
	primary_language: string,
	secondary_language: string,
	city: string,
	code_of_conduct: boolean,
	contact_info: string
}
type ProfileFormGridSelectState = {
	race: {select: string, text: string},
	religion: {select: string, text: string},
	sexuality: {select: string, text: string},
	household_income: {select: string, text: string},
	heard: {select: string, text: string},
	household_composition:{select: string, text: string},
	contact: {select: string, text: string},
	gender: {select: string, text: string},

}
export {contactOptions, heardOptions, genderOptions, religionOptions, sexualityOptions, raceOptions, incomeOptions, householdCompositionOptions}
export type {ProfileFormGridState, ProfileFormGridSelectState}