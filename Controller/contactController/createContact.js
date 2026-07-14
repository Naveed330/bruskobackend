import Contact from '../../Modals/contactModal/ContactUsModal.js'

export const createContact = async (req, res) => {
    try {
        const {
            name = "",
            phone = "",
            description = "",
        } = req.body;

        if (!name.trim() || !phone.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and Phone Number is Required.",
            });
        }

        const contact = await Contact.create({
            name: name.trim(),
            phone: phone.trim(),
            description: description.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Application Submitted Successfully.",
            data: contact,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting the Application.",
            error: error.message,
        });
    }
};

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalContacts: contacts.length,
            data: contacts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch contacts.",
            error: error.message,
        });
    }
};