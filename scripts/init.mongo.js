// para correr el script mongo 
var db = new Mongo().getDB('mom');

db.users.remove({});
db.queues.remove({});

db.users.insertMany([
    {
        uid: "SQOeRG1avvVsqgzJequgQMLgKSx1",
        email: "sebasdev92@gmail.com",
        name: "Juan Sebastián Valencia "
    },
    {
        uid: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
        email: "jjchavarrg@gmail.com",
        name: "Jhon Jairo Chavarria"
    },
    {
        uid: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
        email: "davidsanchezuribe@hotmail.com",
        name: "David Sanchez Uribe"
    },
    {
        uid: "YZomcrfAJeNCtJDPqu00NcTquq42",
        email: "emontoya@eafit.edu.co",
        name: "Edwin Nelson Montoya"
    },    
]);

db.queues.insertMany([
    {
        uid: "44171123-72bf-4aa3-9c6e-4cbd68c11dfa",
        owner: "SQOeRG1avvVsqgzJequgQMLgKSx1",
        date: Date.now(),
        name: "Tópicos especiales en Telemática",
        members: [
            {
                id: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Probando el chat",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Si funciona",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Mensajes recibidos",
                        readed: false,
                    },
                ],
            },
            {
                id: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Probando el chat",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Si funciona",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Mensajes recibidos",
                        readed: false,
                    },
                ],

            },
            {
                id: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Probando el chat",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Si funciona",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Mensajes recibidos",
                        readed: false,
                    },
                ],
            }
        ]
    },
    {
        uid: "a8b90fe9-f2ce-441c-8aec-1fef296adea1",
        owner: "SQOeRG1avvVsqgzJequgQMLgKSx1",
        date: Date.now(),
        name: "Tunel directo de sebastian a jhon",
        members: [
            {
                id: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Oe",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Está funcionando",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Si",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                ],
            },
            {
                id: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Oe",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Está funcionando",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Si",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "SQOeRG1avvVsqgzJequgQMLgKSx1",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                ],
            }
        ]

    },
    {
        uid: "ac7b6ee8-d2ad-4859-bd82-d09ef2f6811e",
        owner: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
        date: Date.now(),
        name: "Tunel directo de jhon a david",
        members: [
            {
                id: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Oe",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Está funcionando",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Si",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                ],
            },
            {
                id: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                messages: [
                    {
                        uid: "64fbea18-1dbe-4f63-9437-88aba04b4420",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Oe",
                        readed: false,
                    },
                    {
                        uid: "61fd35b6-fe12-4083-95a1-302ca5576348",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Está funcionando",
                        readed: false,
                    },
                    {
                        uid: "c0453d21-63c7-4f95-ace9-8e4c016021fb",
                        creator: "XxQ1KHSdUaMMhOoQhc8cgtuiNjK2",
                        date: Date.now(),
                        text: "Si",
                        readed: false,
                    },
                    {
                        uid: "572a4df7-6042-4bd2-9134-d59308636379",
                        creator: "tAtRZ2XLYwMZCnEcVgEkMXajbe83",
                        date: Date.now(),
                        text: "Excelente",
                        readed: false,
                    },
                ],
            }
        ]

    }
]);