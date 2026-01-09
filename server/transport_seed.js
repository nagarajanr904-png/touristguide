const { Bus, Train } = require('./models');
const { sequelize } = require('./config/database');

const buses = [
    { route_id: 'TN-SETC-CHN-MDU-01', from_city: 'Chennai', to_city: 'Madurai', bus_type: 'Govt', departure_time: '21:00', arrival_time: '05:30', duration: '8h 30m', approximate_fare: 650 },
    { route_id: 'TN-SETC-CHN-MDU-02', from_city: 'Chennai', to_city: 'Madurai', bus_type: 'Govt', departure_time: '22:30', arrival_time: '07:00', duration: '8h 30m', approximate_fare: 650 },
    { route_id: 'PVT-SRS-CHN-CBE-01', from_city: 'Chennai', to_city: 'Coimbatore', bus_type: 'Private', departure_time: '20:30', arrival_time: '06:00', duration: '9h 30m', approximate_fare: 950 },
    { route_id: 'TN-SETC-CBE-CHN-01', from_city: 'Coimbatore', to_city: 'Chennai', bus_type: 'Govt', departure_time: '21:15', arrival_time: '06:45', duration: '9h 30m', approximate_fare: 700 },
    { route_id: 'PVT-KPN-MDU-CHN-01', from_city: 'Madurai', to_city: 'Chennai', bus_type: 'Private', departure_time: '22:00', arrival_time: '06:00', duration: '8h 00m', approximate_fare: 850 },
    { route_id: 'TN-STC-TRY-CHN-01', from_city: 'Trichy', to_city: 'Chennai', bus_type: 'Govt', departure_time: '10:00', arrival_time: '16:00', duration: '6h 00m', approximate_fare: 450 },
    { route_id: 'TN-STC-SLM-CBE-01', from_city: 'Salem', to_city: 'Coimbatore', bus_type: 'Govt', departure_time: '08:00', arrival_time: '11:30', duration: '3h 30m', approximate_fare: 250 },
    { route_id: 'TN-SETC-CHN-KKI-01', from_city: 'Chennai', to_city: 'Kanyakumari', bus_type: 'Govt', departure_time: '18:00', arrival_time: '08:00', duration: '14h 00m', approximate_fare: 1100 },
    { route_id: 'PVT-PARV-TLY-CHN-01', from_city: 'Tirunelveli', to_city: 'Chennai', bus_type: 'Private', departure_time: '19:30', arrival_time: '07:30', duration: '12h 00m', approximate_fare: 1200 },
    { route_id: 'TN-STC-VLR-CHN-01', from_city: 'Vellore', to_city: 'Chennai', bus_type: 'Govt', departure_time: '06:00', arrival_time: '09:00', duration: '3h 00m', approximate_fare: 180 },
    { route_id: 'TN-STC-TNJ-TRY-01', from_city: 'Thanjavur', to_city: 'Trichy', bus_type: 'Govt', departure_time: '07:30', arrival_time: '09:00', duration: '1h 30m', approximate_fare: 80 },
    { route_id: 'TN-STC-ERO-CBE-01', from_city: 'Erode', to_city: 'Coimbatore', bus_type: 'Govt', departure_time: '09:00', arrival_time: '11:00', duration: '2h 00m', approximate_fare: 120 },
    { route_id: 'TN-STC-TPR-CBE-01', from_city: 'Tiruppur', to_city: 'Coimbatore', bus_type: 'Govt', departure_time: '14:00', arrival_time: '15:15', duration: '1h 15m', approximate_fare: 70 },
    { route_id: 'TN-STC-DGL-MDU-01', from_city: 'Dindigul', to_city: 'Madurai', bus_type: 'Govt', departure_time: '16:00', arrival_time: '17:15', duration: '1h 15m', approximate_fare: 80 },
    { route_id: 'TN-STC-KRR-TRY-01', from_city: 'Karur', to_city: 'Trichy', bus_type: 'Govt', departure_time: '05:30', arrival_time: '07:30', duration: '2h 00m', approximate_fare: 100 },
    { route_id: 'TN-STC-NMK-SLM-01', from_city: 'Namakkal', to_city: 'Salem', bus_type: 'Govt', departure_time: '11:00', arrival_time: '12:15', duration: '1h 15m', approximate_fare: 60 },
    { route_id: 'TN-STC-CUD-CHN-01', from_city: 'Cuddalore', to_city: 'Chennai', bus_type: 'Govt', departure_time: '04:00', arrival_time: '08:30', duration: '4h 30m', approximate_fare: 280 },
    { route_id: 'TN-STC-VPM-CHN-01', from_city: 'Villupuram', to_city: 'Chennai', bus_type: 'Govt', departure_time: '06:00', arrival_time: '09:30', duration: '3h 30m', approximate_fare: 200 },
    { route_id: 'TN-STC-NGP-TNJ-01', from_city: 'Nagapattinam', to_city: 'Thanjavur', bus_type: 'Govt', departure_time: '08:00', arrival_time: '10:30', duration: '2h 30m', approximate_fare: 110 }
];

const trains = [
    { train_id: '12635', train_name: 'Vaigai Superfast Express', from_station: 'Chennai Egmore', to_station: 'Madurai Junction', departure_time: '13:50', arrival_time: '21:15', duration: '7h 25m', classes_available: 'CC, 2S' },
    { train_id: '12636', train_name: 'Vaigai Superfast Express', from_station: 'Madurai Junction', to_station: 'Chennai Egmore', departure_time: '07:10', arrival_time: '14:30', duration: '7h 20m', classes_available: 'CC, 2S' },
    { train_id: '12633', train_name: 'Kanyakumari Express', from_station: 'Chennai Egmore', to_station: 'Kanyakumari', departure_time: '17:15', arrival_time: '05:50', duration: '12h 35m', classes_available: 'SL, 3A, 2A, 1A' },
    { train_id: '12673', train_name: 'Cheran Superfast Express', from_station: 'Chennai Central', to_station: 'Coimbatore Junction', departure_time: '22:00', arrival_time: '06:00', duration: '8h 00m', classes_available: 'SL, 3A, 2A, 1A' },
    { train_id: '12674', train_name: 'Cheran Superfast Express', from_station: 'Coimbatore Junction', to_station: 'Chennai Central', departure_time: '22:50', arrival_time: '07:00', duration: '8h 10m', classes_available: 'SL, 3A, 2A, 1A' },
    { train_id: '12631', train_name: 'Nellai Superfast Express', from_station: 'Chennai Egmore', to_station: 'Tirunelveli Junction', departure_time: '20:10', arrival_time: '06:40', duration: '10h 30m', classes_available: 'SL, 3A, 2A' },
    { train_id: '12623', train_name: 'Chennai Mail', from_station: 'Chennai Central', to_station: 'Thiruvananthapuram Central', departure_time: '19:45', arrival_time: '11:45', duration: '16h 00m', classes_available: 'SL, 3A, 2A' },
    { train_id: '16101', train_name: 'Boat Mail Express', from_station: 'Chennai Egmore', to_station: 'Rameswaram', departure_time: '19:15', arrival_time: '08:20', duration: '13h 05m', classes_available: 'SL, 3A, 2A' },
    { train_id: '12601', train_name: 'Mangaluru Mail', from_station: 'Chennai Central', to_station: 'Mangaluru Central', departure_time: '20:20', arrival_time: '12:10', duration: '15h 50m', classes_available: 'SL, 3A, 2A' },
    { train_id: '12637', train_name: 'Pandian Superfast Express', from_station: 'Chennai Egmore', to_station: 'Madurai Junction', departure_time: '21:40', arrival_time: '05:20', duration: '7h 40m', classes_available: 'SL, 3A, 2A, 1A' },
    { train_id: '22671', train_name: 'Tejas Express', from_station: 'Chennai Egmore', to_station: 'Madurai Junction', departure_time: '06:00', arrival_time: '12:15', duration: '6h 15m', classes_available: 'EC, CC' },
    { train_id: '12007', train_name: 'Shatabdi Express', from_station: 'Chennai Central', to_station: 'Mysuru Junction', departure_time: '06:00', arrival_time: '13:00', duration: '7h 00m', classes_available: 'EC, CC' },
    { train_id: '12657', train_name: 'KSR Bengaluru Mail', from_station: 'Chennai Central', to_station: 'KSR Bengaluru Junction', departure_time: '22:50', arrival_time: '04:30', duration: '5h 40m', classes_available: 'SL, 3A, 2A, 1A' }
];

const seedTransport = async () => {
    try {
        await sequelize.sync(); // Ensure tables are created

        await Bus.destroy({ where: {} });
        await Train.destroy({ where: {} });

        await Bus.bulkCreate(buses);
        await Train.bulkCreate(trains);

        console.log('Transport data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding transport data:', error);
        process.exit(1);
    }
};

seedTransport();
