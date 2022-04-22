const genderOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Male", label: "Male"},
	{ value: "Female", label: "Female"},
	{ value: "Non-Binary", label: "Non-Binary"},
	{ value: "Genderqueer", label: "Genderqueer"},
	{ value: "Agender", label: "Agender"},
	{ value: "Genderfluid", label: "Genderfluid"},
	{ value: "Other", label: "Other"},
	{ value: "Prefer not to say", label: "Prefer not to say"}
]
const religionOptions = [
	{ value: "Select", label: "--Select--", isDisabled: true},
	{ value: "Muslim", label: "Muslim"},
	{ value: "Jewish", label: "Jewish"},
	{ value: "Satanist", label: "Satanist"},
	{ value: "Atheist", label: "Atheist"},
	{ value: "Agnostic", label: "Agnostic"},
	{ value: "Scientologist", label: "Scientologist"},
	{ value: "Buddhist", label: "Buddhist"},
	{ value: "Sikh", label: "Sikh"},
	{ value: "Hindu", label: "Hindu"},
	{ value: "Taoism", label: "Taoism"},
	{ value: "Jainism", label: "Jainism"},
	{ value: "Pastafarianism", label: "Pastafarianism"},
	{ value: "Spiritual", label: "Not religious, but like, spiritual"},
	{ value: "Other", label: "Other"}
]
const sexualityOptions = [
	{ value: "Select", label: "--Select--" },
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
	{ value: "Select", label: "--Select--" },
	{ value: "White", label: "White" },
	{ value: "Black", label: "Black or African American" },
	{ value: "Native", label: "Native American or Alaska Native" },
	{ value: "Asian", label: "Asian" },
	{ value: "Pacific", label: "Native Hawaiian or Other Pacific Islander" },
	{ value: "Hispanic", label: "Hispanic" },
	{ value: "Other", label: "Other" }
]
const incomeOptions = [
	{ value: "Select", label: "--Select--" },
	{ value: "<20000", label: "0 - 20,000" },
	{ value: "<50000", label: "20,000 - 50,000" },
	{ value: "<100000", label: "50,000 - 100,000" },
	{ value: "<250000", label: "100,000 - 250,000" },
	{ value: ">250000", label: "250,000+" },
]
type ProfileFormGridState = {
	day: string,
	month: string,
	year: string,
	gender: string,
	height: string,
	weight: string,
	grade: string,
	postalCode: string,
	race: string,
	religion: string,
	sexuality: string,
	household_income: string,
	num_family_members: string,
	primary_language: string,
	secondary_language: string,
	heard: string,
	contact: boolean,
	code_of_conduct: boolean
}
export {genderOptions, religionOptions, sexualityOptions, raceOptions, incomeOptions}
export type {ProfileFormGridState}