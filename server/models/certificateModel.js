let certificates = [
    { id: 1, name: 'Certificate One' },
    { id: 2, name: 'Certificate Two' }
  ];
  
  exports.getAllCertificates = () => certificates;
  
  exports.addCertificate = (certificate) => {
    certificates.push(certificate);
    return certificate;
  };
  
  exports.getCertificateById = (id) => certificates.find(certificate => certificate.id === id);
  