import User from '../models/User.model.js';
import Doctor from '../models/Doctor.model.js';
import Booking from '../models/Booking.model.js';
import Stripe from 'stripe';

// export const getCheckoutSession = async (req, res) => {

//     try {
//         const doctor = await Doctor.findById(req.params.doctorId);
//         const user = await User.findById(req.userId);

//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
//             cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
//             cutomer_email:user.email,
//             client_reference_id: req.params.doctorId,
//             metadata: {
//             client_reference_id: req.params.doctorId,
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'inr',
//                         unit_amount: doctor.ticketPrice * 100,
//                         product_data: {
//                             name: doctor.name,
//                             description: doctor.bio,
//                             images: [doctor.photo],
//                         },
//                     },
//                     quantity: 1,
//                 },
//             ],
//         }});

//         const booking = new Booking({
//             doctor: doctor._id,
//             user: user._id,
//             ticketPrice: doctor.ticketPrice,
//             session: session.id,
//         });

//         await booking.save();

//         res.status(200).json({ success: true, message: 'Successfully Paid', session });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Error creating checkout session", error: err.message });
//     }
// };

const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
        });

        await booking.save();

        res.status(200).json({ success: true, message: 'Booking successfully completed', booking });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error completing booking", error: err.message });
    }
};

export { getCheckoutSession };


