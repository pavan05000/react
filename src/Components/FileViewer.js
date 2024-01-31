import React, { useState, useEffect } from 'react';
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaySlipViewer = () => {
  const { id } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`http://192.168.1.163:8092/payslip/image/${id}`, {
          responseType: 'arraybuffer',
        });

        if (response.status === 200) {
          const base64Data = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const dataUrl = `data:${response.headers['content-type'].toLowerCase()};base64,${base64Data}`;
          setFileData(dataUrl);
        } else {
          console.error('Error fetching file. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [id]);

  return (
    <div className="wrapper">
      <SideNav />
      <div className="main">
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">
              <strong>PaySlip Viewer</strong>
            </h1>
            {fileData ? (
              <img src={fileData} alt={`payslip_${id}`} style={{ maxWidth: '100%' }} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PaySlipViewer;
