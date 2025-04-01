
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { WarehouseSection } from "@/lib/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShelfProps {
  position: [number, number, number];
  size: [number, number, number];
  baseColor: string;
  shelfColor: string;
  isHighlighted: boolean;
  name: string;
  isOccupied: boolean;
}

const Shelf: React.FC<ShelfProps> = ({ 
  position, 
  size, 
  baseColor, 
  shelfColor, 
  isHighlighted, 
  name,
  isOccupied
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.scale.set(1.05, 1.05, 1.05);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [isHighlighted]);

  // Number of shelves in the rack (3 levels)
  const shelves = 3;
  const shelfSpacing = 0.8; // Spacing between shelves

  return (
    <group name={name} position={position}>
      {/* Basic frame/structure */}
      <mesh
        castShadow
        receiveShadow
      >
        <boxGeometry args={[size[0], 0.05, size[2]]} />
        <meshPhysicalMaterial 
          color={isHighlighted ? "#FF6B6B" : "#666666"}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Vertical supports on corners */}
      {[
        [-size[0]/2 + 0.05, 0, -size[2]/2 + 0.05],
        [size[0]/2 - 0.05, 0, -size[2]/2 + 0.05],
        [-size[0]/2 + 0.05, 0, size[2]/2 - 0.05],
        [size[0]/2 - 0.05, 0, size[2]/2 - 0.05],
      ].map((pos, i) => (
        <mesh 
          key={`support-${i}`} 
          position={[pos[0], (shelves * shelfSpacing) / 2, pos[2]]}
          castShadow
        >
          <boxGeometry args={[0.08, shelves * shelfSpacing, 0.08]} />
          <meshStandardMaterial color={isHighlighted ? "#FF9B9B" : "#888888"} />
        </mesh>
      ))}
      
      {/* Individual shelves stacked vertically */}
      {[...Array(shelves)].map((_, i) => {
        const shelfY = i * shelfSpacing;
        // Make shelves occupied if needed based on level
        const thisShelfOccupied = isOccupied && (i < 2); // First two levels can be occupied
        
        return (
          <group key={`shelf-${i}`} position={[0, shelfY, 0]}>
            {/* Shelf platform */}
            <mesh 
              position={[0, 0, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[size[0] - 0.1, 0.05, size[2] - 0.1]} />
              <meshStandardMaterial 
                color={thisShelfOccupied ? "#E5DEFF" : "#C8C8C9"} 
                metalness={0.2}
                roughness={0.8}
              />
            </mesh>
            
            {/* Add boxes on shelf if occupied */}
            {thisShelfOccupied && (
              <group>
                {i === 0 && (
                  <mesh position={[0, 0.25, 0]} castShadow>
                    <boxGeometry args={[size[0] * 0.7, 0.4, size[2] * 0.7]} />
                    <meshStandardMaterial color="#9b87f5" />
                  </mesh>
                )}
                {i === 1 && (
                  <>
                    <mesh position={[-size[0]/4, 0.15, 0]} castShadow>
                      <boxGeometry args={[size[0] * 0.3, 0.25, size[2] * 0.5]} />
                      <meshStandardMaterial color="#1EAEDB" />
                    </mesh>
                    <mesh position={[size[0]/4, 0.2, 0]} castShadow>
                      <boxGeometry args={[size[0] * 0.3, 0.3, size[2] * 0.6]} />
                      <meshStandardMaterial color="#E67E22" />
                    </mesh>
                  </>
                )}
              </group>
            )}
          </group>
        );
      })}
      
      {/* Shelf position identifier */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.2}
        color="#333333"
        anchorY="top"
      >
        {name.split("-")[2]}
      </Text>
    </group>
  );
};

const Floor: React.FC = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f7fafc" roughness={0.8} metalness={0.2} />
      </mesh>
      <Grid 
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6E59A5"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#9b87f5"
        fadeDistance={30}
        fadeStrength={1.5}
      />
    </>
  );
};

const WarehouseScene: React.FC<{
  sections: WarehouseSection[];
  highlightedShelf: string | null;
}> = ({ sections, highlightedShelf }) => {
  const { camera } = useThree();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Position camera to show all shelves clearly
    camera.position.set(10, 10, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Calculate total width needed for all sections
  const totalSectionsWidth = sections.length * 8;  // Reduced spacing
  const startX = -(totalSectionsWidth / 2) + 4;    // Adjusted center point

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 12, 8]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Floor />
      
      <Center>
        {sections.map((section, sectionIndex) => {
          // Change name from Section to Shelf
          const shelfName = `${t('shelf')} ${String.fromCharCode(65 + sectionIndex)}`;
          
          // Position sections in a row, adjusting X coordinate
          const sectionOffsetX = startX + sectionIndex * 8;
          
          return (
            <group key={section.id} position={[sectionOffsetX, 0, 0]}>
              <Text
                position={[0, 2.5, -2.5]}
                fontSize={0.5}
                color="#333"
                anchorY="top"
                fontWeight="bold"
              >
                {shelfName}
              </Text>

              {Array.from({ length: section.rows }).map((_, row) =>
                Array.from({ length: section.columns }).map((_, col) => {
                  // Update the shelfId to match the 2D view
                  const shelfId = `${shelfName}-${row + 1}-${col + 1}`;
                  const occupancyFactor = section.occupancy / 100;
                  const isOccupied = Math.random() < occupancyFactor;
                  
                  return (
                    <Shelf
                      key={shelfId}
                      position={[
                        col * 1.8 - (section.columns - 1), 
                        0, 
                        row * 1.8 - (section.rows - 1)
                      ]}
                      size={[1.5, 1, 1.5]}
                      baseColor="#E5DEFF"
                      shelfColor="#C8C8C9" 
                      isHighlighted={highlightedShelf === shelfId}
                      isOccupied={isOccupied}
                      name={shelfId}
                    />
                  );
                })
              )}
            </group>
          );
        })}
      </Center>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
};

interface Warehouse3DViewProps {
  sections: WarehouseSection[];
  highlightedShelf: string | null;
}

const Warehouse3DView: React.FC<Warehouse3DViewProps> = ({ sections, highlightedShelf }) => {
  return (
    <div className="h-full w-full">
      <Canvas 
        shadows 
        gl={{ antialias: true }}
        camera={{ position: [0, 10, 15], fov: 50 }}
      >
        <WarehouseScene sections={sections} highlightedShelf={highlightedShelf} />
      </Canvas>
    </div>
  );
};

export default Warehouse3DView;
