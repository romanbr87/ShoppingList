'use server'
import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api


export async function POST(request) {

    // Use request.json() to read and parse the JSON payload.
    let data;
    try {
        data = await request.json();
    } catch (error) {
        console.error("Failed to parse JSON body:", error);
        return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
    }

    const { name, email, phone, msg } = data;


    const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;


    console.log("dealing with request")
    //const formData = await request.formData()
    // const name = formData.get('name')
    // const email = formData.get('email')
    // const message = formData.get('message')
    // const name = "123"
    // const email = "romanbr@gmail.com"
    // const message = "12345"

    // create transporter object
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    try {
        // const html = `
        //     <p>Name: ${name} </p>
        //     <p>Email: ${email} </p>
        //     <p>Phone: ${phone} </p>
        //     <p>Message: ${msg} </p>`;

        const html = `
  ${name ? `<p>Name: ${name}</p>` : ''}
  ${email ? `<p>Email: ${email}</p>` : ''}
  ${phone ? `<p>Phone: ${phone}</p>` : ''}
  ${msg ? `<p>Message: ${msg}</p>` : ''}
`;
        const mail = await transporter.sendMail({
            from: "ronenbr70@gmail.com",
            to: email,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: html
        })

        // return NextResponse.json({ message: "Success: email was sent" })
        //console.log({ EMAIL_HOST, EMAIL_USER, EMAIL_PASS });
        console.log('\x1B[2J\x1B[0;0H')
        console.log(html);
        return NextResponse.json({ message: { name, email, msg } })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }

}