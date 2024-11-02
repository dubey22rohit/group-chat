import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "gc-redis-kafka",
  brokers: [process.env.KAFKA_BROKER!],
  //   ssl: true,
  //   sasl: {
  //     mechanism: "scram-sha-256",
  //     username: process.env.KAFKA_USERNAME,
  //     password: process.env.KAFKA_PASSWORD,
  //   },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: "chats",
  heartbeatInterval: 10000,
  sessionTimeout: 60000,
});

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};
