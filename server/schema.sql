-- SQL Table Creation Scripts

-- Create Buses Table
CREATE TABLE IF NOT EXISTS `Buses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_id` varchar(255) NOT NULL,
  `from_city` varchar(255) NOT NULL,
  `to_city` varchar(255) NOT NULL,
  `bus_type` enum('Govt','Private') NOT NULL,
  `departure_time` varchar(255) NOT NULL,
  `arrival_time` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `approximate_fare` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Trains Table
CREATE TABLE IF NOT EXISTS `Trains` (
  `id` int NOT NULL AUTO_INCREMENT,
  `train_id` varchar(255) NOT NULL,
  `train_name` varchar(255) NOT NULL,
  `from_station` varchar(255) NOT NULL,
  `to_station` varchar(255) NOT NULL,
  `departure_time` varchar(255) NOT NULL,
  `arrival_time` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `classes_available` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sample Data Insertion Scripts

-- Insert Buses
INSERT INTO `Buses` (`route_id`, `from_city`, `to_city`, `bus_type`, `departure_time`, `arrival_time`, `duration`, `approximate_fare`, `createdAt`, `updatedAt`) VALUES
('TN-SETC-CHN-MDU-01', 'Chennai', 'Madurai', 'Govt', '21:00', '05:30', '8h 30m', 650, NOW(), NOW()),
('TN-SETC-CHN-MDU-02', 'Chennai', 'Madurai', 'Govt', '22:30', '07:00', '8h 30m', 650, NOW(), NOW()),
('PVT-SRS-CHN-CBE-01', 'Chennai', 'Coimbatore', 'Private', '20:30', '06:00', '9h 30m', 950, NOW(), NOW()),
('TN-SETC-CBE-CHN-01', 'Coimbatore', 'Chennai', 'Govt', '21:15', '06:45', '9h 30m', 700, NOW(), NOW()),
('PVT-KPN-MDU-CHN-01', 'Madurai', 'Chennai', 'Private', '22:00', '06:00', '8h 00m', 850, NOW(), NOW()),
('TN-STC-TRY-CHN-01', 'Trichy', 'Chennai', 'Govt', '10:00', '16:00', '6h 00m', 450, NOW(), NOW()),
('TN-STC-SLM-CBE-01', 'Salem', 'Coimbatore', 'Govt', '08:00', '11:30', '3h 30m', 250, NOW(), NOW()),
('TN-SETC-CHN-KKI-01', 'Chennai', 'Kanyakumari', 'Govt', '18:00', '08:00', '14h 00m', 1100, NOW(), NOW()),
('PVT-PARV-TLY-CHN-01', 'Tirunelveli', 'Chennai', 'Private', '19:30', '07:30', '12h 00m', 1200, NOW(), NOW()),
('TN-STC-VLR-CHN-01', 'Vellore', 'Chennai', 'Govt', '06:00', '09:00', '3h 00m', 180, NOW(), NOW()),
('TN-STC-TNJ-TRY-01', 'Thanjavur', 'Trichy', 'Govt', '07:30', '09:00', '1h 30m', 80, NOW(), NOW()),
('TN-STC-ERO-CBE-01', 'Erode', 'Coimbatore', 'Govt', '09:00', '11:00', '2h 00m', 120, NOW(), NOW()),
('TN-STC-TPR-CBE-01', 'Tiruppur', 'Coimbatore', 'Govt', '14:00', '15:15', '1h 15m', 70, NOW(), NOW()),
('TN-STC-DGL-MDU-01', 'Dindigul', 'Madurai', 'Govt', '16:00', '17:15', '1h 15m', 80, NOW(), NOW()),
('TN-STC-KRR-TRY-01', 'Karur', 'Trichy', 'Govt', '05:30', '07:30', '2h 00m', 100, NOW(), NOW()),
('TN-STC-NMK-SLM-01', 'Namakkal', 'Salem', 'Govt', '11:00', '12:15', '1h 15m', 60, NOW(), NOW()),
('TN-STC-CUD-CHN-01', 'Cuddalore', 'Chennai', 'Govt', '04:00', '08:30', '4h 30m', 280, NOW(), NOW()),
('TN-STC-VPM-CHN-01', 'Villupuram', 'Chennai', 'Govt', '06:00', '09:30', '3h 30m', 200, NOW(), NOW()),
('TN-STC-NGP-TNJ-01', 'Nagapattinam', 'Thanjavur', 'Govt', '08:00', '10:30', '2h 30m', 110, NOW(), NOW());

-- Insert Trains
INSERT INTO `Trains` (`train_id`, `train_name`, `from_station`, `to_station`, `departure_time`, `arrival_time`, `duration`, `classes_available`, `createdAt`, `updatedAt`) VALUES
('12635', 'Vaigai Superfast Express', 'Chennai Egmore', 'Madurai Junction', '13:50', '21:15', '7h 25m', 'CC, 2S', NOW(), NOW()),
('12636', 'Vaigai Superfast Express', 'Madurai Junction', 'Chennai Egmore', '07:10', '14:30', '7h 20m', 'CC, 2S', NOW(), NOW()),
('12633', 'Kanyakumari Express', 'Chennai Egmore', 'Kanyakumari', '17:15', '05:50', '12h 35m', 'SL, 3A, 2A, 1A', NOW(), NOW()),
('12673', 'Cheran Superfast Express', 'Chennai Central', 'Coimbatore Junction', '22:00', '06:00', '8h 00m', 'SL, 3A, 2A, 1A', NOW(), NOW()),
('12674', 'Cheran Superfast Express', 'Coimbatore Junction', 'Chennai Central', '22:50', '07:00', '8h 10m', 'SL, 3A, 2A, 1A', NOW(), NOW()),
('12631', 'Nellai Superfast Express', 'Chennai Egmore', 'Tirunelveli Junction', '20:10', '06:40', '10h 30m', 'SL, 3A, 2A', NOW(), NOW()),
('12623', 'Chennai Mail', 'Chennai Central', 'Thiruvananthapuram Central', '19:45', '11:45', '16h 00m', 'SL, 3A, 2A', NOW(), NOW()),
('16101', 'Boat Mail Express', 'Chennai Egmore', 'Rameswaram', '19:15', '08:20', '13h 05m', 'SL, 3A, 2A', NOW(), NOW()),
('12601', 'Mangaluru Mail', 'Chennai Central', 'Mangaluru Central', '20:20', '12:10', '15h 50m', 'SL, 3A, 2A', NOW(), NOW()),
('12637', 'Pandian Superfast Express', 'Chennai Egmore', 'Madurai Junction', '21:40', '05:20', '7h 40m', 'SL, 3A, 2A, 1A', NOW(), NOW()),
('22671', 'Tejas Express', 'Chennai Egmore', 'Madurai Junction', '06:00', '12:15', '6h 15m', 'EC, CC', NOW(), NOW()),
('12007', 'Shatabdi Express', 'Chennai Central', 'Mysuru Junction', '06:00', '13:00', '7h 00m', 'EC, CC', NOW(), NOW()),
('12657', 'KSR Bengaluru Mail', 'Chennai Central', 'KSR Bengaluru Junction', '22:50', '04:30', '5h 40m', 'SL, 3A, 2A, 1A', NOW(), NOW());
