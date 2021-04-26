const testInvoices = [
  {
    id: "FV2353",
    createdAt: "2021-11-05",
    paymentDue: "2021-11-12",
    description: "Logo Re-design",
    paymentTerms: 7,
    clientName: "Anita Wainwright",
    clientEmail: "",
    status: "draft",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom"
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    items: [
      {
        name: "Logo Re-design",
        quantity: 1,
        price: 3102.04,
        total: 3102.04
      }
    ],
    total: 3102.04
  },
  {
    items: [
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0
      }
    ],
    total: 0,
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    createdAt: "4-24-2021",
    paymentDue: "5-24-2021",
    description: "",
    clientName: "",
    clientEmail: "",
    status: "pending",
    paymentTerms: 30,
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    id: "EKLiG_s"
  },
  {
    items: [
      {
        name: "Cake",
        quantity: 2,
        price: 30,
        total: 60
      },
      {
        name: "party hats",
        quantity: 100,
        price: 1,
        total: 100
      },
      {
        name: "video games",
        quantity: 10,
        price: 60,
        total: 600
      }
    ],
    total: 760,
    senderAddress: {
      street: "100 somewhere drive",
      city: "Remote",
      postCode: "97458",
      country: "USA"
    },
    createdAt: "5-1-2021",
    paymentDue: "5-15-2021",
    description: "Party ^^",
    clientName: "john doe",
    clientEmail: "johndoe@email.com",
    status: "pending",
    paymentTerms: 14,
    clientAddress: {
      street: "200 nowhere blvd",
      city: "Tulsa",
      postCode: "92492",
      country: "USA"
    },
    id: "hxnFYGh"
  },
  {
    items: [
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0
      }
    ],
    total: 0,
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    createdAt: "4-24-2021",
    paymentDue: "5-24-2021",
    description: "",
    clientName: "",
    clientEmail: "",
    status: "draft",
    paymentTerms: 30,
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    id: "l_h0KL2"
  }
];

module.exports = testInvoices;
