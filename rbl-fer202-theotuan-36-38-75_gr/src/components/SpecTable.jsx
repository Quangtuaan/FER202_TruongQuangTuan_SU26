import React from 'react';
import './SpecTable.css';

/**
 * SpecTable component to display specifications of a supercar.
 * Receives the specs data via props.
 * 
 * @param {Object} props
 * @param {Object} props.specs - The specifications object
 * @param {number} props.specs.engineCC - Engine capacity in CC
 * @param {string} props.specs.engineType - Engine cylinder/type
 * @param {number} props.specs.horsepower - Power output in HP
 * @param {number} props.specs.torque - Torque in Nm
 * @param {number} props.specs.topSpeedKmh - Maximum speed in Km/h
 * @param {number} props.specs.acceleration0to100 - 0-100 Km/h acceleration time in seconds
 * @param {string} props.specs.transmission - Gearbox details
 * @param {string} props.specs.drivetrain - Wheel drive layout (e.g., AWD, RWD)
 */
const SpecTable = ({ specs }) => {
  if (!specs) return <div className="spec-table-empty">Không có thông số kỹ thuật.</div>;

  const specItems = [
    { label: 'Động cơ', value: specs.engineType || 'N/A' },
    { label: 'Dung tích xi lanh', value: specs.engineCC ? `${specs.engineCC.toLocaleString()} cc` : 'N/A' },
    { label: 'Công suất', value: specs.horsepower ? `${specs.horsepower} HP` : 'N/A' },
    { label: 'Mô-men xoắn', value: specs.torque ? `${specs.torque} Nm` : 'N/A' },
    { label: 'Tốc độ tối đa', value: specs.topSpeedKmh ? `${specs.topSpeedKmh} km/h` : 'N/A' },
    { label: 'Tăng tốc 0–100 km/h', value: specs.acceleration0to100 ? `${specs.acceleration0to100} giây` : 'N/A' },
    { label: 'Hộp số', value: specs.transmission || 'N/A' },
    { label: 'Hệ dẫn động', value: specs.drivetrain || 'N/A' },
  ];

  return (
    <div className="spec-table-container">
      <table className="spec-table">
        <thead>
          <tr>
            <th colSpan="2">THÔNG SỐ KỸ THUẬT CHI TIẾT</th>
          </tr>
        </thead>
        <tbody>
          {specItems.map((item, index) => (
            <tr key={index}>
              <td className="spec-label">{item.label}</td>
              <td className="spec-value">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecTable;
