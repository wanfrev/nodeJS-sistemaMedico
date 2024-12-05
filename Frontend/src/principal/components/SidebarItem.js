export const getSidebarItems = (userProfile, setIsModalOpen) => {
    
    // Rutas para pacientes (userProfile === 1)
    if (userProfile === 3) {
      return [
        { label: 'Home', to: '/home' },
        { label: 'Citas', onClick: () => setIsModalOpen(true) },
        { label: 'Historia Médica', to: '/medicalHistory' },
        { label: 'Medicamentos', to: '/medications' }
      ];
    }

    // Rutas para médicos (userProfile === 2)
    if (userProfile === 2) {
        return [
            { label: 'Home', to: '/home' },
            { label: 'Citas', onClick: () => setIsModalOpen(true) },
            { label: 'Historia Médica', to: '/medicalHistory' },
            { label: 'Medicamentos', to: '/medications' }
          ];
      }
  
    // Rutas para administradores (userProfile === 3)
    if (userProfile === 1) {
      return [
        { label: 'Home', to: '/home' },
        { label: 'Citas', to: '/CreateQuote'},
        { label: 'Historia Médica', to: '/medicalHistory' },
        { label: 'Medicamentos', to: '/medications' },
        { label: 'Seguridad', to: '/security' }
      ];
    }
  
    // En caso de que no sea un perfil reconocido
    return [];
  };
  