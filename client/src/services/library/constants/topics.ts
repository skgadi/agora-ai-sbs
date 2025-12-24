export interface GSK_TOPIC {
  topic: string;
  sub?: GSK_TOPIC[];
}
export const topics: GSK_TOPIC[] = [
  {
    topic: 'Introduction to Smart Bioelectrochemical Systems',
    sub: [
      {
        topic: 'Definition and Scope',
        sub: [
          {
            topic:
              'Bioelectrochemical coupling of microbial or enzymatic processes with electrodes',
          },
          { topic: 'Distinction between conventional BES and smart, data-driven SBES' },
          { topic: 'Role in sustainability, circular economy, and decentralized infrastructure' },
        ],
      },
      {
        topic: 'Historical Evolution',
        sub: [
          { topic: 'Early microbial fuel cell research' },
          { topic: 'Expansion into wastewater treatment and energy recovery' },
          { topic: 'Emergence of AI-enabled and IoT-connected SBES platforms' },
        ],
      },
    ],
  },
  {
    topic: 'Fundamentals of Bioelectrochemical Systems',
    sub: [
      {
        topic: 'Electrochemical Principles',
        sub: [
          { topic: 'Redox thermodynamics and electrode potentials' },
          { topic: 'Electrochemical kinetics and overpotentials' },
          { topic: 'Mass transport, ohmic losses, and internal resistance' },
        ],
      },
      {
        topic: 'Microbial Electrochemistry',
        sub: [
          { topic: 'Extracellular Electron Transfer (EET) mechanisms' },
          { topic: 'Direct and mediated electron transfer pathways' },
          { topic: 'Thermodynamics of microbial redox reactions' },
          { topic: 'Interspecies electron transfer (DIET and MIET)' },
        ],
      },
      {
        topic: 'Biofilm Science',
        sub: [
          { topic: 'Biofilm kinetics and growth models' },
          { topic: 'Biofilm architecture and conductivity' },
          { topic: 'Microbial community dynamics and succession' },
        ],
      },
      {
        topic: 'Performance Metrics',
        sub: [
          { topic: 'Current density and power density' },
          { topic: 'Coulombic and energy efficiency' },
          { topic: 'Substrate removal and conversion efficiency' },
        ],
      },
    ],
  },
  {
    topic: 'Reactor Design and Materials',
    sub: [
      {
        topic: 'Electrode Materials',
        sub: [
          { topic: 'Advanced anode materials and surface functionalization' },
          { topic: 'Cathode catalysts and biocathodes' },
          { topic: 'Nanostructured and composite electrodes' },
        ],
      },
      {
        topic: 'Membranes and Ion Transport',
        sub: [
          { topic: 'Cation and anion exchange membranes' },
          { topic: 'Ion transport mechanisms and selectivity' },
          { topic: 'Membrane fouling and durability' },
        ],
      },
      {
        topic: 'Reactor Architecture',
        sub: [
          { topic: 'Single-chamber and multi-chamber configurations' },
          { topic: 'Configuration geometry and scaling laws' },
          { topic: 'Modularization and stack design' },
        ],
      },
    ],
  },
  {
    topic: 'Types of Bioelectrochemical Systems',
    sub: [
      {
        topic: 'Microbial Fuel Cells',
        sub: [
          { topic: 'Benthic, plant-based, and photosynthetic MFCs' },
          { topic: 'Self-powered sensing applications' },
        ],
      },
      {
        topic: 'Microbial Electrolysis Cells',
        sub: [
          { topic: 'Hydrogen and methane production' },
          { topic: 'Electro-fermentation systems' },
        ],
      },
      {
        topic: 'Microbial Desalination Cells',
        sub: [
          { topic: 'Wastewater-driven desalination' },
          { topic: 'Multi-ion separation architectures' },
        ],
      },
      {
        topic: 'Microbial Electrosynthesis Systems',
        sub: [
          { topic: 'CO2 conversion to fuels and chemicals' },
          { topic: 'Precision production of biofuels and bioplastics' },
        ],
      },
    ],
  },
  {
    topic: 'Smart Layer: Sensors, IoT, and Data Acquisition',
    sub: [
      {
        topic: 'In-situ Monitoring Technologies',
        sub: [
          { topic: 'Real-time electrochemical impedance spectroscopy (EIS)' },
          { topic: 'Chemical, optical, and biosensors' },
          { topic: 'Monitoring microbial activity and community dynamics' },
        ],
      },
      {
        topic: 'Connectivity and IoT Frameworks',
        sub: [
          { topic: 'IoT architectures for remote SBES operation' },
          { topic: 'Self-powered and energy-autonomous sensor nodes' },
          { topic: 'Wireless sensor networks in industrial environments' },
        ],
      },
      {
        topic: 'Edge and Cloud Computing',
        sub: [
          { topic: 'Edge computing for low-latency monitoring and control' },
          { topic: 'Cloud-based data aggregation and analytics' },
          { topic: 'Data synchronization and fault tolerance' },
        ],
      },
    ],
  },
  {
    topic: 'Artificial Intelligence and Control',
    sub: [
      {
        topic: 'Machine Learning and Data Analytics',
        sub: [
          { topic: 'Neural networks for performance and energy yield prediction' },
          { topic: 'Anomaly detection and system health diagnostics' },
          { topic: 'Microbial community inference from sensor data' },
        ],
      },
      {
        topic: 'Advanced Control Strategies',
        sub: [
          { topic: 'Reinforcement learning for autonomous pH and potential control' },
          { topic: 'Adaptive and model-predictive control' },
          { topic: 'Closed-loop optimization of biological and electrochemical variables' },
        ],
      },
      {
        topic: 'Digital Twins and Modeling',
        sub: [
          { topic: 'Multi-physics simulation of SBES' },
          { topic: 'Hybrid mechanistic–AI models' },
          { topic: 'Virtual commissioning and real-time optimization' },
        ],
      },
    ],
  },
  {
    topic: 'Applications and Resource Recovery',
    sub: [
      {
        topic: 'Smart Wastewater Treatment',
        sub: [
          { topic: 'Self-powered BOD and toxicity sensing' },
          { topic: 'Automated nitrogen and phosphorus recovery' },
        ],
      },
      {
        topic: 'Energy and Fuel Production',
        sub: [
          { topic: 'Electricity generation from organic waste' },
          { topic: 'Green hydrogen and methane production' },
        ],
      },
      {
        topic: 'Environmental Remediation',
        sub: [
          { topic: 'Heavy metal and contaminant removal' },
          { topic: 'Soil and sediment bioremediation' },
        ],
      },
    ],
  },
  {
    topic: 'Scale-Up, Commercialization, and Governance',
    sub: [
      {
        topic: 'Techno-Economic and Environmental Assessment',
        sub: [
          { topic: 'Life cycle assessment (LCA)' },
          { topic: 'Techno-economic analysis (TEA)' },
        ],
      },
      {
        topic: 'Manufacturing and Deployment',
        sub: [
          { topic: 'Pilot-scale and industrial SBES deployment' },
          { topic: 'Reliability, maintainability, and lifetime analysis' },
        ],
      },
      {
        topic: 'Cybersecurity and Data Governance',
        sub: [
          { topic: 'Secure IoT communication and control' },
          { topic: 'Data integrity, privacy, and ownership' },
        ],
      },
    ],
  },
  {
    topic: 'Emerging Technologies and Future Directions',
    sub: [
      {
        topic: 'Synthetic Biology and Genetic Engineering',
        sub: [
          { topic: 'Genetically engineered electrogenic microorganisms' },
          { topic: 'Metabolic pathway optimization for electron transfer' },
        ],
      },
      {
        topic: 'Nanotechnology and Advanced Manufacturing',
        sub: [
          { topic: '3D-printed smart bioelectrodes' },
          { topic: 'Nano-enabled sensing and catalytic materials' },
        ],
      },
      {
        topic: 'Societal, Ethical, and Regulatory Aspects',
        sub: [
          { topic: 'Sustainability and ethical implications' },
          { topic: 'Standards, certification, and regulatory frameworks' },
        ],
      },
    ],
  },
];
